import {Compiler} from 'webpack'
const path = require('path')

class TestPlugin {
  options: any

  constructor(opts: any) {
    this.options = Object.assign({}, opts)
  }
  apply(compiler: Compiler) {
    const onBeforeHtmlGeneration = (htmlPluginData: any, callback: any) => {
      const {assets} = htmlPluginData
      console.log('onBeforeHtmlGeneration')
      // const js = path.resolve(__dirname, './test.js')
      // assets.js = [js].concat(assets.js)

      if (callback) {
        callback(null, htmlPluginData)
      } else {
        return Promise.resolve(htmlPluginData)
      }
    }

    const onA = (htmlPluginData: any, callback: any) => {
      console.log('onA', htmlPluginData.assetTags.scripts)
      // htmlPluginData.assetTags.scripts.unshift({
      //   tagName: 'script',
      //   voidTag: false,
      //   meta: {plugin: 'html-webpack-plugin'},
      //   attributes: {defer: false, type: undefined, src: path.resolve(__dirname, './test.js')},
      // })
      if (callback) {
        callback(null, htmlPluginData)
      } else {
        return Promise.resolve(htmlPluginData)
      }
    }
    // console.log('TestPlugin', compiler.options.entry.index.import)
    compiler.hooks.thisCompilation.tap('emit', (compilation: any, options: any) => {
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      const htmlPlugins = compilation.options.plugins.filter((plugin: any) => plugin instanceof HtmlWebpackPlugin)
      if (htmlPlugins.length === 0) {
        const message =
          "Error running html-webpack-tags-plugin, are you sure you have html-webpack-plugin before it in your webpack config's plugins?"
        throw new Error(message)
      }
      console.log('hooks', hooks)
      // hooks.beforeAssetTacleagGeneration.tapAsync('htmlWebpackTagsPlugin', onBeforeHtmlGeneration)
      hooks.alterAssetTags.tapAsync('htmlWebpackTagsPlugin', onA)
    })
    // compiler.hooks.entryOption.tap('polyfill-plugin', () => {
    //   console.log('entryOption', compiler.options.entry)
    //   // compiler.options.entry.index.import.unshift(path.resolve(__dirname, './test.js'))
    //   // params.options.entry.index.import.unshift(path.resolve(__dirname, './test.js'))
    //   // callback && callback()
    // })
    compiler.hooks.environment.tap('polyfill-plugin', () => {
      console.log('environment', compiler.options.entry)
      compiler.options.entry.polyfill = {
        import: [path.resolve(__dirname, './test.js')],
      }
      // params.options.entry.index.import.unshift(path.resolve(__dirname, './test.js'))
      // callback && callback()
    })

    compiler.hooks.afterCompile.tap('ExportAssets', compilation => {
      const entrypoints = compilation.entrypoints
      const entryNames = Array.from(entrypoints.keys())
      // const polyfillName = entrypoints.get('polyfill').getFiles()
      console.log('afterCompile', entryNames)
      const HtmlWebpackPlugin = require('html-webpack-plugin')
      const hooks = HtmlWebpackPlugin.getHooks(compilation)
      const htmlPlugins = compilation.options.plugins.filter((plugin: any) => plugin instanceof HtmlWebpackPlugin)
      if (htmlPlugins.length === 0) {
        const message =
          "Error running html-webpack-tags-plugin, are you sure you have html-webpack-plugin before it in your webpack config's plugins?"
        throw new Error(message)
      }
      // hooks.beforeAssetTagGeneration.tapAsync('htmlWebpackTagsPlugin', onBeforeHtmlGeneration)
      // hooks.alterAssetTags.tapAsync('htmlWebpackTagsPlugin', (htmlPluginData: any, callback: any) => {
      //   htmlPluginData.assetTags.scripts.unshift({
      //     tagName: 'script',
      //     voidTag: false,
      //     meta: {plugin: 'html-webpack-plugin'},
      //     attributes: {defer: false, type: undefined, src: polyfillName[0]},
      //   })
      //   console.log('htmlWebpackTagsPlugin', htmlPluginData.assetTags.scripts)
      //   if (callback) {
      //     callback(null, htmlPluginData)
      //   } else {
      //     return Promise.resolve(htmlPluginData)
      //   }
      // })
    })
  }
}

export default TestPlugin
