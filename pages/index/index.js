//index.js主界面
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    userId:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //底部字
    text1:'Listen to your heart .',
    //图标源
    icon:'../../icon/music_icon.png',
    icon1:'../../icon/voice_icon.png',
    icon2:'../../icon/sum_icon.png'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../musicplay/songAndPlay'
    })
  },
  bindViewTap1:function(){
    wx.navigateTo({
      url: '../voiceRecognition/emotion',
    })
  },
  bindViewTap2: function () {
    wx.navigateTo({
      url: '../stat/charts',
    })
  },
  
  onLoad: function () {
    if (app.globalData.userInfo && app.globalData.userId ) {
      this.setData({
        userInfo: app.globalData.userInfo,
        userId: app.globalData.userId ,
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
