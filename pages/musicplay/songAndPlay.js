// pages/musicplay/songAndPlay.js
const app = getApp();
Page({
  data: {
    // 页面配置 
    winWidth: 0,
    winHeight: 0,
    
    //Tab切换
    currentTab: 0,
    clickMusicId: 3,

    //Tab-Play播放
    pauseStatus: false,
    length: 10,

    //Tab-song
    musicDetailList: [{
      musicid: 0,
      songTitle: 'Call_Me_Baby',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Call_Me_Baby.mp3',
    }, {
      musicid: 1,
      songTitle: 'Good_Time',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Good_Time.mp3',
    }, {
      musicid: 2,
      songTitle: 'Maps',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/maps.mp3',
    }, {
      musicid: 3,
      songTitle: 'Animals',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Animals.mp3',
    }, {
      musicid: 4,
      songTitle: 'Sugar',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Sugar.mp3',
    }, {
      musicid: 5,
      songTitle: 'All_Right.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/All_Right.mp3'
    }, {
      musicid: 6,
      songTitle: 'Animals.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Animals.mp3'
    }, {
      musicid: 7,
      songTitle: 'Bila.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Bila.mp3'
    }, {
      musicid: 8,
      songTitle: 'Cake By The Ocean.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Cake By The Ocean.mp3'
    }, {
      musicid: 9,
      songTitle: 'Good_Time',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Good_Time.mp3',
    }]
  },

  onLoad: function (e) {
    var that = this;
    var data = null;
    var jsonString = null;
    var tempMusicDetailList = []
    // 获取系统信息 
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        })
      }
    })
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    that.audioCtx = wx.createAudioContext('myAudio')

    //如果经过情绪测试IsReg==ture,则发送请求
    //musicId存在一个数组app.globalData.musicIdList[i]中
    console.log("标志位" + app.globalData.IsReg)

    if (app.globalData.IsReg == true) {
      console.log("app.globalData.musicIdList=" + app.globalData.musicIdList)

      wx.request({
        url: "http://localhost:8080/getMusicDetail?musicIdList=" + app.globalData.musicIdList,
        header: {
          'content-type': 'json' // 默认值
        },
        success: function (res) {
          console.log("songTitle" + res.data["0"].song.songTitle)
          data = res.data
          that.setData({
            "musicDetailList[0].songTitle": res.data["0"].song.songTitle,
             "musicDetailList[0].singerName": res.data["0"].singer.singerName,
             "musicDetailList[0].songDir": res.data["0"].song.songDir
          })
          that.setData({
            "musicDetailList[1].songTitle": res.data["1"].song.songTitle,
            "musicDetailList[1].singerName": res.data["1"].singer.singerName,
            "musicDetailList[1].songDir": res.data["1"].song.songDir
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
    if (this.data.currentTab === e.currentTarget.dataset.current)
    { return false; }
    else {
      that.setData({ currentTab: e.currentTarget.dataset.current })
    }
  },
  //点击item切换到播放页面
  onclick: function (e) {
    var that = this;
    that.audioCtx.play()
    console.log("id=" + e.currentTarget.dataset.musicid)
    that.setData({
      currentTab: 1,
      clickMusicId: e.currentTarget.dataset.musicid
    })
    console.log("136=" + that.data.clickMusicId)
  },
  //Tab-Play的播放暂停
  bindTapPlay: function () {
    var that = this;
    //获取播放地址
    var src = that.data.musicDetailList[that.data.clickMusicId].songDir
    console.log("clickMusicId=" + that.data.clickMusicId + "src=" + src)
    that.audioCtx.setSrc(src)

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
    let length = 10
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
    if (audioIndexPrev == length) {
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