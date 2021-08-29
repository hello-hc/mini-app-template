export default {
  pages: ["pages/index/index", "pages/me/index"],
  tabBar: {
    color: "#333",
    selectedColor: "#93B5CF",
    backgroundColor: "#fff",
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "resource/copyImages/home.png",
        selectedIconPath: "resource/copyImages/home_active.png"
      },
      {
        text: "我的",
        pagePath: "pages/me/index",
        iconPath: "resource/copyImages/me.png",
        selectedIconPath: "resource/copyImages/me_active.png"
      }
    ],
    custom: true
  },
  permission: {
    "scope.userLocation": {
      desc: "获取位置信息"
    }
  },
  requiredBackgroundModes: ["location"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "white",
    onReachBottomDistance: 50
  },
  // 分包加载示例（同小程序配置 https://developers.weixin.qq.com/miniprogram/dev/framework/subpackages/basic.html），如果有需要请自行添加
  subpackages: [
    {
      root: "pages/login", // 分包根目录
      pages: [
        // 分包页面路径，相对于分包根目录
        "index"
      ]
    },
    {
      root: "pages/switch-server",
      pages: ["index"]
    }
  ]
};
