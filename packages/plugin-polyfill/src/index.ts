import type {ConfigPluginOptions} from '@efox/emp'
import TestPlugin from './plugin'

const PluginPolyfill = async ({wpChain, config}: ConfigPluginOptions) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const polyfill = config.polyfill
  if (polyfill) {
    wpChain.plugin('polyfill-plugin').use(TestPlugin, [{polyfill}])
  }
}

export default PluginPolyfill
module.exports = PluginPolyfill
