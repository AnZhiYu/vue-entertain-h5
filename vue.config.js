/* eslint-disable */
const path = require("path");
const autoprefixer = require("autoprefixer");
// const pxtoviewport = require('postcss-px-to-viewport');
const pxtorem = require("postcss-pxtorem");
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const isProduction = process.env.NODE_ENV === 'production';

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: './',
  assetsDir: "static/",
  productionSourceMap: false,
  css: {
    extract: true,
    loaderOptions: {
      postcss: {
        plugins: loader => [
          require("postcss-import")({ root: loader.resourcePath }),
          require("postcss-preset-env")({
            autoprefixer: {
              overrideBrowserslist: [
              "> 1%",
              "last 2 versions",
              "not dead",
              "Android >= 4.0",
              "iOS >= 7"]
            },
            stage: 3,
          }),
          require("cssnano")(),
          // require("autoprefixer")(),
          pxtorem({
            rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: [".van"], // 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })
        ]
        // plugins: [
        //   autoprefixer(),
        //   // pxtoviewport({
        //   //   viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度
        //   //   viewportHeight: 667, // 视窗的高度，根据375设备的宽度来指定，一般指定667，也可以不配置
        //   // }),
        //   pxtorem({
        //     rootValue: 37.5, // 换算的基数(设计图750的根字体为32)
        //     selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
        //     propList: ["*"], //可以从px更改为rem的属性。
        //     minPixelValue: 2 // 设置要替换的最小像素值。
        //   })
        // ],
      },
      less: {
        lessOptions: {
          modifyVars: {
            hack: `true; @import "${path.join(__dirname, "./src/styles/vars.less")}";`
          }
        },
      }
    }
  },
  chainWebpack: config => {
    config.plugins.delete("prefetch");
    config.plugins.delete("preload");
    config.plugin("html").tap(args => {
      args[0].title = "客宴";
      return args;
    });
    // config.resolve.alias
    // .set('@$', resolve('src'))
    // .set('assets',resolve('src/assets'))
    // .set('components',resolve('src/components'))
    // .set('layout',resolve('src/layout'))
    // .set('base',resolve('src/base'))
    // .set('static',resolve('src/static'))
  },
  configureWebpack: config => {
    // 如果是多环境打包
    if (process.env.NODE_ENV === "production") {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    // if (isProduction) {
    //   config.plugins.push(new CompressionWebpackPlugin({
    //     algorithm: 'gzip',
    //     test: /\.js$|\.html$|\.json$|\.css/,
    //     threshold: 10240,
    //     minRatio: 0.8
    //    }))
    // }
  },
  // resolve: {
  //   extensions: ['.js', '.vue', '.json'],
  // },
  devServer: {
    open: true,
    disableHostCheck: true,
    proxy: {
      "/dev": {
        // target: "http://6b6aa8c08dcd.ngrok.io",
        target: "http://front.wkbwkb.com/",
        // secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/dev": ""
        }
      },
      "/dev-m": {
        target: "https://manager.dajiaunion.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/dev-m": ""
        }
      },
      "/test": {
        target: "https://api.dajiaunion.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/test": ""
        }
      },
      "/pro": {
        target: "https://api.dajiaunion.com",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          "^/pro": ""
        }
      }
      // "/img": {
      //   target: "https://api.dajiaunion.com",
      //   secure: false,
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/img": ""
      //   }
      // }
    }
  },
  transpileDependencies: [
    "vue" // 将可能不会被编译的依赖写到该数组
  ]
};
