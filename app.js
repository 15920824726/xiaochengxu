//app.js
/*
  模块 共用js  
  自定义组件(注意-数组中:一次刷新,更新新的改变属性是数据不会变化)
*/
import URL from './config/url'
import { ENV } from './config/env'

App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.getSystemInfo({
      success: function(res) {
        wx.setStorageSync('dpr', res.pixelRatio > 2 ? 3: 2)
      },
    })
  },
  api: URL[ENV],
  globalData: {
    userInfo: null,
    tabDatas: [
      {
        pagePath: "/pages/index/index",
        text: "",
        iconPath: "/assets/images/first-unclick@3x.png",
        selectedIconPath: "/assets/images/first-click@3x.png",
        selected: true,
        selectedColor: "#d5b68b",
        clas: "menu-item",
        hover: "hover_my",
        nav: "redirect",
        active: false
      },
      {
        pagePath: "/pages/project/project",
        iconPath: "/assets/images/tab-add@3x.png",
        selectedIconPath: "/assets/images/tab-add@3x.png",
        selected: false,
        nav: "navigate",
      },
      {
        pagePath: "/pages/my/my",
        iconPath: "/assets/images/my-unclick@3x.png",
        selectedIconPath: "/assets/images/my-click@3x.png",
        selected: false,
        nav: "redirect",
      }
    ]
  }
})