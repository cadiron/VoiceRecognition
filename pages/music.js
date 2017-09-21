// pages/music.js
Page({

  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    this.audioCtx.play()
  },
  data: {
    src: '',
    song: [{
      musicid: 1,
      poster: 'http://159.203.250.111/Carly.png',
      name: 'Call_Me_Baby',
      author: 'Carly_Rae_Jepsen',
      src: 'http://159.203.250.111/Call_Me_Baby.mp3',
    },

    {
      musicid: 2,
      poster: 'http://159.203.250.111/carly.png',
      name: 'Good_Time',
      author: 'Carly_Rae_Jepsen',
      src: 'http://159.203.250.111/Good_Time.mp3',
    }]

  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  }


})