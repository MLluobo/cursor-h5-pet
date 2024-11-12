declare module 'postcss-pxtorem' {
  interface Options {
    rootValue: number | ((input: any) => number)
    unitPrecision?: number
    propList?: string[]
    selectorBlackList?: (string | RegExp)[]
    replace?: boolean
    mediaQuery?: boolean
    minPixelValue?: number
    exclude?: RegExp | RegExp[] | ((filePath: string) => boolean)
  }

  function pxtorem(options: Options): any
  export = pxtorem
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
