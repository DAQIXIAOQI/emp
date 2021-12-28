import {Compiler} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import Ejs from 'ejs'
import path from 'path'
import fs from 'fs'

const writeIfModified = function (filename: string, newContent: string) {
  try {
    const oldContent = fs.readFileSync(filename, 'utf8')
    if (oldContent == newContent) {
      console.warn(`* Skipping file '${filename}' because it is up-to-date`)
      return
    }
  } catch (err) {}
  if (['0', 'false'].indexOf(process.env.DRY_RUN || '0') !== -1) {
    fs.writeFileSync(filename, newContent)
  }
  console.warn(`* Updating outdated file '${filename}'`)
}

const PluginName = 'polyfill-plugin'
const entryName = 'polyfill'
class TestPlugin {
  options: any

  constructor(opts: any) {
    this.options = Object.assign({}, opts)
  }
  apply(compiler: Compiler) {
    // entry 入口注入polyfill
    compiler.hooks.environment.tap(PluginName, async () => {
      // const resultString = await Ejs.renderFile(path.resolve(__dirname, '../src/tpl.ejs'), this.options.polyfill, {})
      // writeIfModified(path.resolve(__dirname, '../stash/test.ts'), resultString)
      console.log(compiler.options.output.path)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // compiler.options.entry[entryName] = {
      //   import: [path.resolve(__dirname, '../stash/test.ts')],
      // }
    })

    // compiler.hooks.afterEmit.tap(PluginName, async compilation => {
    // })

    compiler.hooks.thisCompilation.tap(PluginName, compilation => {
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      const htmlPlugins = compilation.options.plugins.filter((plugin: any) => plugin instanceof HtmlWebpackPlugin)
      if (htmlPlugins.length === 0) {
        const message =
          "Error running html-webpack-tags-plugin, are you sure you have html-webpack-plugin before it in your webpack config's plugins?"
        throw new Error(message)
      }
      hooks.beforeAssetTagGeneration.tapAsync(PluginName, (opt, fn) => {
        opt.plugin.options && (opt.plugin.options.title = '1011112222222')
        opt.plugin.options && (opt.plugin.options.test = 'a')
        console.log('beforeAssetTagGeneration1', opt)
        fn && fn(null, opt)
      })
      // hooks.beforeEmit.tapAsync(
      //   PluginName,
      //   async (opt: {html: string; outputName: string; plugin: HtmlWebpackPlugin}, callback) => {
      //     console.log('before', opt)
      //     // const resultString = await Ejs.renderFile(
      //     //   path.resolve(__dirname, '../src/tpl2.ejs'),
      //     //   this.options.polyfill,
      //     //   {},
      //     // )
      //     opt.plugin.userOptions.title = '11111'
      //     console.log('before1', opt)
      //     callback && callback(null, opt)
      //   },
      // )
    })

    // compiler.hooks.thisCompilation.tap(PluginName, compilation => {
    //   let polyfilename: string
    //   compilation.hooks.processAssets.tapAsync(PluginName, (_compilationAssets, callback) => {
    //     const files = compilation?.entrypoints?.get(entryName)?.getFiles()
    //     if (files && files.length) {
    //       polyfilename = files[0]
    //     }
    //     callback && callback()
    //   })

    //   const hooks = HtmlWebpackPlugin.getHooks(compilation)
    //   const htmlPlugins = compilation.options.plugins.filter((plugin: any) => plugin instanceof HtmlWebpackPlugin)
    //   if (htmlPlugins.length === 0) {
    //     const message =
    //       "Error running html-webpack-tags-plugin, are you sure you have html-webpack-plugin before it in your webpack config's plugins?"
    //     throw new Error(message)
    //   }
    //   hooks.alterAssetTags.tapAsync(PluginName, (htmlPluginData, callback) => {
    //     if (polyfilename) {
    //       console.log('unshift polyfilename', polyfilename)
    //       htmlPluginData.assetTags.scripts.unshift({
    //         tagName: 'script',
    //         voidTag: false,
    //         meta: {plugin: 'html-webpack-plugin'},
    //         attributes: {defer: false, type: undefined, src: polyfilename},
    //       })
    //     }
    //     if (callback) {
    //       callback(null, htmlPluginData)
    //     } else {
    //       return Promise.resolve(htmlPluginData)
    //     }
    //   })
    // })
  }
}

export default TestPlugin
