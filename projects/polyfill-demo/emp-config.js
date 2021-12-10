const {defineConfig} = require('@efox/emp')

module.exports = defineConfig(({mode}) => {
  const target = 'es5'
  return {
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
    plugins: [],
  }
})
