const {defineConfig} = require('@efox/emp')
const pluginPolyfill = require('@efox/plugin-polyfill')

module.exports = defineConfig(({mode}) => {
  const target = 'es5'
  return {
    plugins: [pluginPolyfill],
    build: {
      target,
    },
    server: {
      port: 8001,
    },
    html: {
      title: 'Micro-Host',
      files: {
        js: ['//static.bdgamelive.com/public/assets/js/hm.js'],
      },
    },
    polyfill: {
      IE: {
        js: [
          '//static.bdgamelive.com/public/assets/js/babel-polyfill.7.2.5.min.js',
          '//unpkg.bdgamelive.com/webupload/currentScript-polyfill@1.0.0/currentScript.js',
        ],
      },
    },
  }
})
