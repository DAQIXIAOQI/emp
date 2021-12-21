import type {ConfigPluginOptions} from '@efox/emp'
// import path from 'path'
import TestPlugin from './plugin'
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

const PluginPolyfill = async ({wpChain, config}: ConfigPluginOptions) => {
  const resultString = await Ejs.renderFile(path.resolve(__dirname, '../src/tpl.ejs'), {})
  writeIfModified(path.resolve(__dirname, '../src/test.ts'), resultString)
  if (config && config.polyfill) {
    const {IE, Android, Ios, auto} = config.polyfill
    console.log(IE, Android, Ios, auto)
  }
  wpChain.plugin('polyfill-plugin').use(TestPlugin, [{}])
}

export default PluginPolyfill
module.exports = PluginPolyfill
