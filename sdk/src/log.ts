type Log = {
  info: (str: string) => void;
  error: (str: string) => void;
  debug: (str: string) => void;
}

const typeColor = {
  info: '#3b8ff6',
  error: 'red',
  debug: undefined
}

const _log = (type: 'info' | 'error' | 'debug', str: string) => {
  console.log(`%c🚀 讯盟监控: %c${str}`, 'color: rgb(240, 139, 90)', `color:${typeColor[type]}`)
}

export const log: Log = {
  info (str: string) {
    _log('info', str)
  },
  error (str: string) {
    _log('error', str)
  },
  debug  (str: string) {
    _log('debug', str)
  }
}
