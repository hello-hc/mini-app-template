# MiniAppTemplate

## 项目介绍
  **此项目基于Taro3.x开发的微信小程序模版**

> 本项目无主页面组件展示，主要是作为小程序开发参考使用

## 主要技术栈
  Taro3.x + React + React Redux + React Saga + Axios + Sass + Eslint

## 版本
  > taro: v3.0.23
  > node: v14.15.3
  > npm: 6.14.9

## 基本使用
````js
  // 安装依赖
  npm install
  // 运行
  npm run dev:weapp
  // 打包
  npm run build:weapp

  // 使用本地mock数据
  // 修改 app.jsx 文件中的 baseUrl 为 http://localhost:3000
  ApiUtil.setBaseUrl('http://localhost:3000');
  // 运行本地mock服务
  npm run start:api
````

## 工具函数介绍（utils）
1. data-processor-utils.js
  基于本地local storage封装的数据处理器
  功能：设置数据（支持设置多个数据 - 对象形式）、获取数据、删除数据、清空所有数据
2. date-time-format-utils.js
  对于日期时间的处理工具函数
3. img-utils.js
  关于图片处理的工具函数
4. location-utils.js
  关于位置信息的工具函数
5. wx-vaildate.js
  关于小程序表单校验的工具函数
6. wechat-authorization.js
  关于小程序授权相关的工具函数
7. utils
  其他工具函数
8. api-config
  抽离的请求API的集合
9. api-constants
  抽离的请求API的常量（包括错误码...）
10. api-request
  封装的基于Axios的API请求函数

