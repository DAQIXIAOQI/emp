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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const polyfill: any = config.polyfill
  console.log(polyfill)
  if (polyfill) {
    const {IE, Android, Ios, auto} = polyfill
    console.log(IE, Android, Ios, auto)

    // const resultString = await Ejs.renderFile(path.resolve(__dirname, '../src/tpl.ejs'), polyfill, {})
    // writeIfModified(path.resolve(__dirname, '../stash/test.ts'), resultString)
    wpChain.plugin('polyfill-plugin').use(TestPlugin, [{polyfill}])
  }
}

export default PluginPolyfill
module.exports = PluginPolyfill
