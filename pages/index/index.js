const app = getApp()

Page({
  data: {
    time: new Date(),
    tabDatas: [],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    svgUrl: ''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      tabDatas: app.globalData.tabDatas,
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    this.setData({
      svgUrl: ''
    })
  },
  getAvatar: function(e) {
    // 在login页面执行
    let that = this
    var count = 0
    var index =setInterval(res=>{
      console.log('count: ' + count++ )
    },3000)
    console.log('index: '+ index)
    
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 进入菜单页面
  goMenu: function() {
    console.log('okok')
    wx.vibrateLong()
    wx.navigateTo({
      url: '../menu/menu'
    })
  },

  goMenu1: function() {
    // 查看是否授权
    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
      }
    })
  },


  login: function (res) {
    console.log(res.detail.userInfo)
    if (!res.detail.userInfo) return
    common.showLoading('登陆中')
    var that = this
    wx.setStorage({
      key: 'user',
      data: res.detail.userInfo
    })
    var user = res.detail.userInfo
    var openid = '';
    var unionid = '';
    // 登录
    wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          method: 'POST',
          data: {
            code: res.code
          },
          url: app.api.baseApiUrl + '/twiapi/v1/mini_sessions',
          success: (res) => {
            if (res.data.status == 200) {
              console.log('获取用户私密信息', res)
              unionid = res.data.data.unionid;
              openid = res.data.data.openid;
              // // 用户登陆注册(接口合一: 如果有登陆,没有注册)
              that.registerInApp(user, openid, unionid)

            } else {
              that.showWrongModal()
              console.log('获取用户私密信息失败')
            }
          },
          fail: () => {
            that.showWrongModal()
            console.log('/minipro/jscode2session/ 出错了')
          }
        })
      },
      fail: (res) => {
        that.showWrongModal()
        console.log('微信 wx.login 出错了')
      }
    })
  },
  // 微信注册
  registerInApp: function (user, openid, unionid) {
    var that = this
    var param = {
      "country": user.country,
      "name": user.nickName,
      "province": user.province,
      "city": user.city,
      "avatar_url": user.avatarUrl,
      "gender": user.gender == 1 ? '10' : '20',
      "openid": openid,
      "unionid": unionid
    };
    console.log("微信注册POST参数:", param)
    wx.request({
      url: app.api.baseApiUrl + '/twiapi/v1/users',
      method: 'POST',
      data: param,
      success: function (res) {
        console.log('注册成功')
        that.wxLoginSuccessCallback(res)
      },
      fail: () => {
        that.showWrongModal()
        console.log('注册失败')
      }
    })
  },
  showWrongModal: () => {
    common.hideLoading()
    wx.showModal({
      title: '小贴士',
      content: '微信登录失败，请稍后再试',
      showCancel: false,
      confirmText: '好的'
    })
  },
  // 登录成功执行
  wxLoginSuccessCallback(res) {
    common.hideLoading()
    console.log(' wxLoginSuccessCallback(res)', res)
    var that = this
    wx.setStorageSync('user', res.data.data.user)
    wx.setStorageSync('token', res.data.data.user.token)
    that.setData({
      user: res.data.data.user
    })
    // 更新全局用户信息
    app.userInfo = res.data.data.user
    app.token = res.data.data.user.token
    common.showMsgToast('登录成功', 'success')
  }


})
