// pages/musicplay/songAndPlay.js
const app = getApp();
Page({
  data: {

    //  页面配置 
    winWidth: 0,
    winHeight: 0,
    //Tab切换
    currentTab: 0,
    clickMusicId: 0,
    //Tab-Play播放
    pauseStatus:false,
    length: 10,
    //Tab-song
    musicDetailList: [{
      musicid: 1,
      songTitle: 'Call_Me_Baby',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Call_Me_Baby.mp3',
    }, {
      musicid: 2,
      songTitle: 'Good_Time',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Good_Time.mp3',
    }, {
      musicid: 3,
      songTitle: 'Maps',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/maps.mp3',
    }, {
      musicid: 4,
      songTitle: 'Animals',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Animals.mp3',
    }, {
      musicid: 5,
      songTitle: 'Sugar',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Sugar.mp3',
    }, {
      musicid: 6,
      songTitle: 'All_Right.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/All_Right.mp3'
    }, {
      musicid: 7,
      songTitle: 'Animals.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Animals.mp3'
    }, {
      musicid: 8,
      songTitle: 'Bila.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Bila.mp3'
    }, {
      musicid: 9,
      songTitle: 'Cake By The Ocean.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Cake By The Ocean.mp3'
    }, {
      musicid: 10,
      songTitle: 'Good_Time',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Good_Time.mp3',
    }]
  },

  onLoad: function (e) {
    var that = this;
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })

    //获取播放地址
    var src = that.data.musicDetailList[that.data.clickMusicId].songDir
   // var src = 'http://159.203.250.111/Good_Time.mp3'
    console.log(that.data.clickMusicId)
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    that.audioCtx = wx.createAudioContext('myAudio')
    that.audioCtx.setSrc(src)


    //如果经过情绪测试IsReg==ture,则发送请求
    //musicId存在一个数组app.globalData.musicIdList[i]中
    if (app.globalData.IsReg == true) {
      var musicIdList = app.globalData.musicIdList;
      wx.request({
        musicIdList: app.globalData.musicIdList,
        url: "http://localhost:8080/getMusicDetail",
        data: musicIdList,
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          that.setData({
            // "musicDetailList[0].songTitle": res.data.song.songTitle,
            // "musicDetailList[0].singerName": res.data.singer.singerName,
            // "musicDetailList[0].songDir": 'http://159.203.250.111/Good_Time.mp3'
          })
        }
      })
    }
  },
  //滑动切换tab
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    })
  },
  //点击切换tab
  switchNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current)
    { return false; }
    else {
      that.setData({ currentTab: e.target.dataset.current })
    }
  },
  //点击item切换到播放页面
  onclick: function (e) {
    var that = this;
    that.setData({
      currentTab: 1,
      clickMusicId: e.target.dataset.id
    })
  },
  //Tab-Play的播放暂停
  bindTapPlay: function () {
    if (this.data.pauseStatus === true) {
      this.audioCtx.play()
      this.setData({ pauseStatus: false })
    } else {
      this.audioCtx.pause()
      this.setData({ pauseStatus: true })
    }
  },
  //Tab-Play的下一首和上一首
  //前一首
  bindTapPrev: function () {
    console.log('bindTapPrev')
    let length =10
    let audioIndexPrev = this.data.clickMusicId
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === 1) {
      audioIndexNow = length 
    } else {
      audioIndexNow = audioIndexPrev - 1
    }
    this.setData({
      clickMusicId: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === true) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('clickMusicId', audioIndexNow)
  },
  //下一首
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = 10
    let audioIndexPrev = this.data.clickMusicId
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev == length ) {
      audioIndexNow = 0
    } else {
      audioIndexNow = audioIndexPrev + 1
    }
    this.setData({
      clickMusicId: audioIndexNow,
      sliderValue: 0,
      currentPosition: 0,
      duration: 0,
    })
    let that = this
    setTimeout(() => {
      if (that.data.pauseStatus === false) {
        that.play()
      }
    }, 1000)
    wx.setStorageSync('clickMusicId', audioIndexNow)
  }
})