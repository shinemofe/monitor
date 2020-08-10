export type Option = {
  appId: string
  domain: string
}

export type UserInfo = {
  platform: string
  platformVersion: string
  browser: string
  browserVersion: string
  position?: string
  network?: string // navigator.connection.effectiveType 非标准
  uuid: string
}

export interface MonitorConstructor {
  uuidKey: string
  new (options: Option): MonitorInterface
}

export interface MonitorInterface {
}

export type TrackItem = {
  type: 'click' | 'page' | 'xhr' | 'log'
  data: TrackItemElement | TrackItemPage | TrackXhr | TrackLog
}

type TrackXhr = {
  type: 'request' | 'response'
  url: string
  method?: string
  body?: any
  status?: number
  responseText?: string
  responseType?: 'load' | 'error' | 'timeout'
}

type TrackLog = {
  type: 'log' | 'warn',
  message: string
}

type TrackItemElement = {
  tagName: string
  className?: string
  idName?: string
}

type TrackItemPage = {
  oldTitle: string
  oldPath: string
  toTitle: string
  toPath: string
}

// 组合和 ErrorEvent 和 Error 的字段
type ReportItem = {
  level: 'warn' | 'error'
  name: string
  message: string
  stack?: string
  filename?: string
  lineno?: number
  colno?: number
  track: TrackItem[]
  userInfo?: UserInfo
  isVue?: boolean
  vueData?: {
    componentTag: string
    handlePosition?: string
  }
  status?: number
  responseText?: string
  responseURL?: string
  timeout?: number
  title?: string
  url?: string
  userAgent?: string
}
