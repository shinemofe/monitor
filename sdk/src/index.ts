import { MonitorInterface, Option, UserInfo, TrackItem, ReportItem } from 'types/index'
import Cookies from 'js-cookie'
import { log } from './log'

export default class Monitor implements MonitorInterface {
  static uuidKey = 'xm_monitor_uuid'
  userInfo?: UserInfo
  track: Array<TrackItem> = []
  options: Option = {
    appId: ''
  }

  constructor (options: Option) {
    if (typeof options !== 'object' || !options.appId) {
      log.error('初始化请传入应用的 appId')
    } else {
      this.initUserInfo()
      this.bindPerformance()
      this.trackClick()
      this.trackPage()
      this.bindXHR()
      this.bindError()
    }
  }

  addTrack (item: TrackItem) {
    this.track.push(item)
    this.track.slice(-10)
  }

  clearTrack () {
    this.track = []
  }

  trackClick () {
    window.addEventListener('click', e => {
      if (e.target) {
        const target = e.target as HTMLElement
        const { tagName, classList, id } = target
        this.addTrack({
          type: 'element',
          data: {
            tagName,
            className: classList.toString(),
            idName: id
          }
        })
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
      _isVue: boolean;
      $vnode: {
        tag: string;
      };
    },
    info?: string | {
      filename?: string;
      lineno?: number;
      colno?: number;
    }
  ) {
    if (typeof error === 'string') {
      error = new Error(error)
    }
    const { name, message, stack } = error
    const errorItem: ReportItem = {
      level: 'error',
      name,
      message,
      stack,
      track: this.track,
      userInfo: this.userInfo
    }
    if (vm && vm._isVue) {
      log.debug('capture vue file error')
      errorItem.isVue = true
      errorItem.vueData = {
        componentTag: vm.$vnode.tag,
        handlePosition: info as string
      }
    }
    if (typeof info === 'object') {
      Object.assign(errorItem, info)
    }
    console.log(errorItem)
  }

  capturePerformance (data: {
    resourceLoad: number;
    domRender: number;
    firstPage: number;
    pageLoad: number;
  }) {
    console.log(data)
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
    console.log('xhr')
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

  initUserInfo () {
    const {
      platform,
      appVersion,
      // @ts-ignore
      connection
    } = navigator
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
