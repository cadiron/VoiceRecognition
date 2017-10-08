//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    IsReg:false,
    musicIdList:[],
    musicList:[
      {
        musicid: 1,
        poster: 'http://159.203.250.111/Carly.png',
        songTitle: 'Call_Me_Baby',
        singerName: 'Carly_Rae_Jepsen',
        songDir: 'http://159.203.250.111/Call_Me_Baby.mp3',
      },

      {
        musicid: 2,
        poster: 'http://159.203.250.111/carly.png',
        songTitle: 'Good_Time',
        singerName: 'Carly_Rae_Jepsen',
        songDir: 'http://159.203.250.111/Good_Time.mp3',
      },

      {
        musicid: 3,
        poster: 'http://159.203.250.111/five1.png',
        songTitle: 'Maps',
        singerName: 'Marron 5',
        songDir: 'http://159.203.250.111/maps.mp3',
      },

      {
        musicid: 4,
        poster: 'http://159.203.250.111/five2.png',
        songTitle: 'Animals',
        singerName: 'Marron 5',
        songDir: 'http://159.203.250.111/Animals.mp3',
      },

      {
        musicid: 5,
        poster: 'http://159.203.250.111/five3.png',
        songTitle: 'Sugar',
        singerName: 'Marron 5',
        songDir: 'http://159.203.250.111/Sugar.mp3',
      }
    ]

  }
})