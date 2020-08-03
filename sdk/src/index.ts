import { MonitorInterface, Option, UserInfo, TrackItem, ReportItem } from 'types/index'
import Cookies from 'js-cookie'
import md5 from 'js-md5'
import { log } from './log'

export default class Monitor implements MonitorInterface {
  static uuidKey = 'xm_monitor_uuid'
  userInfo?: UserInfo
  track: Array<TrackItem> = []
  options: Option = {
    appId: '',
    domain: 'http://localhost:9424'
  }

  constructor (options: Option) {
    if (typeof options !== 'object' || !options.appId) {
      log.error('初始化请传入应用的 appId')
    } else {
      Object.assign(this.options, options)
      this.initUserInfo()
      this.bindPerformance()
      this.trackClick()
      this.trackPage()
      this.bindXHR()
      this.bindError()
      this.bindConsole()
    }
  }

  report (item: ReportItem) {
    const img = new Image()
    img.src = `${this.options.domain}/monitor/report?appId=${this.options.appId}&id=${this.getErrorId(item)}&detail=${JSON.stringify(item)}`
    img.onload = () => {
      log.debug(`上报成功: ${this.getErrorId(item)}`)
    }
    this.clearTrack()
  }

  addTrack (item: TrackItem) {
    this.track.push(item)
    this.track.slice(-30)
  }

  clearTrack () {
    this.track = []
  }

  trackClick () {
    let timer = 0
    const filters = ['HTML', 'BODY']
    window.addEventListener('click', e => {
      if (e.target) {
        const target = e.target as HTMLElement
        const { tagName, classList, id } = target
        if (filters.includes(tagName)) {
          return
        }
        if (timer) {
          clearTimeout(timer)
          timer = 0
        }
        timer = setTimeout(() => {
          this.addTrack({
            type: 'click',
            data: {
              tagName,
              className: classList.toString(),
              idName: id
            }
          })
        }, 100)
      }
    })
  }

  trackPage () {
    window.addEventListener('hashchange', e => {
      this.clearTrack()
      const oldTitle = document.title
      setTimeout(() => {
        this.addTrack({
          type: 'page',
          data: {
            oldTitle,
            oldPath: e.oldURL.replace(location.origin, ''),
            toTitle: document.title,
            toPath: e.newURL.replace(location.origin, '')
          }
        })
      })
    })
  }

  captureError (
    error: Error | string,
    vm?: {
      _isVue?: boolean;
      $vnode?: {
        tag: string;
      };
      _isXhr?: boolean;
    },
    info?: string | {
      filename?: string;
      lineno?: number;
      colno?: number;
      status?: number;
      responseURL?: string;
      responseText?: string;
      timeout?: number;
    }
  ) {
    let noStack = false
    if (typeof error === 'string') {
      noStack = true
      error = new Error(error)
    }
    const { name, message, stack } = error
    const errorItem: ReportItem = {
      level: 'error',
      name,
      message,
      stack: !noStack ? stack : undefined,
      track: [...this.track],
      userInfo: this.userInfo
    }
    if (vm && vm._isVue) {
      log.debug('capture vue file error')
      errorItem.isVue = true
      errorItem.vueData = {
        componentTag: vm.$vnode ? vm.$vnode.tag : '',
        handlePosition: info as string
      }
    }
    if (typeof info === 'object') {
      Object.assign(errorItem, info)
    }
    this.report(errorItem)
  }

  capturePerformance (data: {
    resourceLoad: number;
    domRender: number;
    firstPage: number;
    pageLoad: number;
  }) {
    log.info(JSON.stringify(data))
  }

  bindError () {
    window.addEventListener('error', event => {
      const { filename, lineno, colno } = event
      log.debug('capture js error event')
      this.captureError(event.error, undefined, {
        filename,
        lineno,
        colno
      })
      return true
    })
    window.addEventListener('unhandledrejection', (event) => {
      const { reason } = event
      log.debug('capture unhandledrejection')
      if (reason) {
        this.captureError(reason)
      } else {
        this.captureError(event.type)
      }
    })
  }

  bindXHR () {
    const that = this
    const _bind = () => {
      const xhr = XMLHttpRequest.prototype
      const send = xhr.send
      const open = xhr.open
      xhr.open = function (method: string, url: string) {
        that.addTrack({
          type: 'xhr',
          data: {
            type: 'request',
            url,
            method
          }
        })
        open.call(this, method, url, true)
      }
      xhr.send = function (data) {
        this.addEventListener('error', function () {
          log.error('xhr error')
          that.captureError('接口请求报错', { _isXhr: true }, {
            status: this.status,
            responseURL: this.responseURL,
            responseText: this.responseText
          })
        })
        this.addEventListener('load', function () {
          that.addTrack({
            type: 'xhr',
            data: {
              type: 'response',
              url: this.responseURL,
              status: this.status,
              responseType: 'load',
              responseText: this.responseText
            }
          })
        })
        this.addEventListener('timeout', function () {
          log.error('xhr timeout')
          that.captureError('接口请求超时', { _isXhr: true }, {
            status: this.status,
            responseURL: this.responseURL,
            responseText: this.responseText,
            timeout: this.timeout
          })
        })
        send.call(this, data)
      }
    }
    _bind()
  }

  bindConsole () {
    const log = console.log
    console.log = (...args) => {
      log(...args)
      this.addTrack({
        type: 'log',
        data: {
          type: 'log',
          message: JSON.stringify(args)
        }
      })
    }
  }

  bindPerformance () {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const {
          navigationStart,
          loadEventEnd,
          responseEnd,
          domComplete,
          responseStart
        } = performance.timing
        const resourceLoad = responseEnd - navigationStart
        const domRender = domComplete - responseEnd
        const firstPage = responseStart - navigationStart
        const pageLoad = loadEventEnd - navigationStart
        this.capturePerformance({
          resourceLoad,
          domRender,
          firstPage,
          pageLoad
        })
      })
    })
  }

  getErrorId (item: ReportItem) {
    if (item.responseURL) {
      return md5(item.responseURL)
    }
    return md5(item.name + item.message)
  }

  initUserInfo () {
    const { platform, appVersion, connection } = navigator as (Navigator & { connection?: { effectiveType: string } })
    const arr = appVersion.split(') ')
    const platformVersion = arr[0].split(' ').pop()
    const browser = arr.pop()!.split(' ')[0].split('/')
    this.userInfo = {
      platform,
      network: connection && connection.effectiveType,
      platformVersion: platformVersion ? platformVersion.replace(/_/g, '.') : '',
      browser: browser[0],
      browserVersion: browser[1],
      uuid: this.getUuid()
    }
  }

  getUuid () {
    const uid = Cookies.get(Monitor.uuidKey)
    if (uid) {
      return uid
    }
    const randomString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let res = ''
    for (let i = 0; i < 14; i++) {
      res += randomString[Math.floor(Math.random() * randomString.length)]
    }
    res += Date.now()
    res = window.btoa(unescape(res))
    Cookies.set(Monitor.uuidKey, res)
    return res
  }
}
