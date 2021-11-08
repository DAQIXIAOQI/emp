import store from 'src/helper/store'
import wpChain from 'src/helper/wpChain'
export const wpCSS = (env: string | undefined) => {
  const config = {
    module: {
      rule: {
        css: {
          test: /\.css$/,
          exclude: /node_modules/,
          use: {
            style: {
              loader: require.resolve('style-loader'),
            },
            css: {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
            },
          },
        },
        sass: {
          test: /\.(scss|sass)$/,
          exclude: /node_modules/,
          use: {
            style: {
              loader: require.resolve('style-loader'),
            },
            css: {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
            },
            sass: {
              loader: require.resolve('sass-loader'),
              options: {
                implementation: require('sass'),
                sourceMap: env === 'development',
              },
            },
          },
        },
        less: {
          test: /\.less$/,
          exclude: /node_modules/,
          use: {
            style: {
              loader: require.resolve('style-loader'),
            },
            css: {
              loader: require.resolve('css-loader'),
              options: {
                modules: {
                  localIdentName: '[local]_[hash:base64:5]',
                },
              },
            },
            less: {
              loader: require.resolve('less-loader'),
              options: {
                lessOptions: {javascriptEnabled: true},
              },
            },
          },
        },
      },
    },
  }
  wpChain.merge(config)
}
