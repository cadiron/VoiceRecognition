//app.js
App({
  onLaunch: function () {
    // 1登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx5ad1ef697101f7dd&secret=3d5b704517fac02e72a65859382695dd&js_code=' + res.code + '&grant_type=authorization_code',
            data: {
              code: res.code
            },
            success: res => {
              console.log("用户唯一标识" + res.data.openid)
              this.globalData.openId = res.data.openid
              // 2获取用户个人信息
              wx.getUserInfo({
                success: res => {
                  this.globalData.userInfo = res.userInfo
                  console.log("获取用户个人信息成功=" + res.userInfo.nickName)

                  //3将用户唯一标识openId发送，并获取java服务器的sessionId
                  wx.request({
                    url: 'http://localhost:8080/checkUser?account=' + this.globalData.userInfo.nickName + '&openId=' + this.globalData.openId,
                    header: {
                      'content-type': 'application/json' // 默认值
                    },
                    success: res => {
                      this.globalData.Cookie = 'JSESSIONID=' + res.data;
                      console.log("发送用户信息成功" + this.globalData.Cookie)
                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })


  },
  globalData: {
    Cookie: null,
    openId: null,
    userInfo: null,
    IsReg: false,
    musicIdList: [],
    musicList: [
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