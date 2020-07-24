export type Option = {
  appId: string
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
  type: 'element' | 'page'
  data: TrackItemElement | TrackItemPage
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
}
