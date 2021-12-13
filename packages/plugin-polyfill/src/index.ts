import type {ConfigPluginOptions} from '@efox/emp'
// import path from 'path'
import TestPlugin from './plugin'

const PluginPolyfill = async ({wpChain, config}: ConfigPluginOptions) => {
  if (config && config.polyfill) {
    const {IE, Android, Ios, auto} = config.polyfill
    console.log(IE, Android, Ios, auto)
  }
  wpChain.plugin('polyfill-plugin').use(TestPlugin, [{}])
}

export default PluginPolyfill
module.exports = PluginPolyfill
