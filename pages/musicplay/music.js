// pages/music.js
const app=getApp();

Page({
  data: {
    pauseStatus: false,
    count:1
  },
  onLoad:function(e){
  var id = e.songid;
  // 使用 wx.createAudioContext 获取 audio 上下文 context
  this.audioCtx = wx.createAudioContext('myAudio')
  this.audioCtx.setSrc(id)//怎么获取点击的item信息？已通过全局数据解决
  this.audioCtx.play()
  },
  //播放和暂停
  bindTapPlay: function () {
    if (this.data.pauseStatus === true) {
      this.audioCtx.play()
      this.setData({ pauseStatus: false })
    } else {
      this.audioCtx.pause()
      this.setData({ pauseStatus: true })
    }
  },
  //前一首
  bindTapPrev: function () {
   
    let length = app.grobalData.songlist.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === 0) {
      audioIndexNow = length - 1
    } else {
      audioIndexNow = audioIndexPrev - 1
    }
    this.setData({
      audioIndex: audioIndexNow,
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
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  //下一首
  bindTapNext: function () {
    console.log('bindTapNext')
    let length = this.data.audioList.length
    let audioIndexPrev = this.data.audioIndex
    let audioIndexNow = audioIndexPrev
    if (audioIndexPrev === length - 1) { 
      audioIndexNow = 0
    } else {
      audioIndexNow = audioIndexPrev + 1
    }
    this.setData({
      audioIndex: audioIndexNow,
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
    wx.setStorageSync('audioIndex', audioIndexNow)
  },
  // audioPlay: function () {
  //   this.audioCtx.play()
  // },
  // audioPause: function () {
  //   this.audioCtx.pause()
  // },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }


})