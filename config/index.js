import path from "path";
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config = {
  projectName: "mini-app-template",
  date: "2021-6-15",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [],
  defineConstants: {},
  copy: {
    patterns: [
      {from: 'src/resource/images/', to: 'dist/images/', ignore: ['*.js', '*.jsx']},
      {from: 'src/resource/copyImages/', to: 'dist/copyImages/', ignore: ['*.js', '*.jsx']},
    ],
    options: {},
  },
  framework: "react",
  mini: {
    postcss: {
      // 配置 postcss 相关插件
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      }
    },
    // output: {
    //   filename: '[name].[contenthash].js'
    // },
    // miniCssExtractPluginOption: {
    //   filename: '[name].css',
    //   chunkFilename: '[name].css'
    // },
    optimizeMainPackage: {
      enable: true
    },
    webpackChain (chain, webpack) {
      chain.merge({
        module: {
          rules: [
            {
              test: /\.css$/i,
              use: [MiniCssExtractPlugin.loader, "css-loader"],
            }
          ],
        },
        plugins: [new MiniCssExtractPlugin()]
      })
    },
    imageUrlLoaderOption: {
      // 针对 png | jpg | jpeg | gif | bpm | svg 文件的 url-loader 配置
      limit: 8192,
    },
    fontUrlLoaderOption: {
      // 针对 woff | woff2 | eot | ttf | otf 文件的 url-loader 配置
      limit: 8192,
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  alias: {
    // 配置别名
    "@": path.resolve(__dirname, "..", "src"),
    "Utils": path.resolve(__dirname, "..", "src/utils"),
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
