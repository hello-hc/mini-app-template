// eslint-disable-next-line import/no-commonjs
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
      format: {
        comments: "all"
      },
      compress: {
        unsafe_proto: true
      }
    }
  },
  mini: {
    // 为生产环境配置预渲染
    // 详情查看：https://taro-docs.jd.com/taro/docs/prerender
    // prerender: {
    //   match: 'pages/index/**', // 所有以 `pages/shop/` 开头的页面都参与 prerender
    // }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
};
