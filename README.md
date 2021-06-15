# MiniAppTemplate

## 项目介绍
  此项目基于Taro3.x开发的微信小程序模版

## 主要技术栈
  Taro3.x + React + React Redux + React Saga + Axios + Sass + Eslint

## 版本
  taro: v3.0.23
  node: v14.15.3
  npm: 6.14.9

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
1. data-local-storage.js
  基于本地local storage封装的数据处理器
  功能：设置数据（支持设置多个数据 - 对象形式）、获取数据、删除数据、清空所有数据




