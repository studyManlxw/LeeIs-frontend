const { defineConfig } = require('@vue/cli-service')
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');
const path = require("path");
//less文件的路径
const myTheme = path.resolve(__dirname, "./src/assets/global/less/globalColor.less");
module.exports = defineConfig(
  {
    lintOnSave: false,
    transpileDependencies: true,
    devServer: { //  不检测host
      historyApiFallback: true,
      allowedHosts: "all",
    },
    configureWebpack: {
      plugins: [
        ComponentsPlugin({
          resolvers: [VantResolver()],
        }),
      ],
    },
    css: {
      loaderOptions: {
        less: {
          // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
          lessOptions: {
            modifyVars: {
              // 直接覆盖变量
                hack: `true; @import "${myTheme}";`
            },
          },
        },
      },
    },

  },

)
