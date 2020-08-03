declare module 'js-cookie' {
  export function get (key: string): string | null
  export function set (key: string, value: string): void
}

declare module 'js-md5' {
  export default function (key: string): string
}
