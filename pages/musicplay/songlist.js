// pages/music/songlist.js
const app=getApp();
Page({
  data: {
    musicDetailList: [{
      musicid: 1,
      songTitle: 'Call_Me_Baby',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Call_Me_Baby.mp3',
    },
    {
      musicid: 2,
      songTitle: 'Good_Time',
      singerName: 'Carly_Rae_Jepsen',
      songDir: 'http://159.203.250.111/Good_Time.mp3',
    },

    {
      musicid: 3,
      songTitle: 'Maps',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/maps.mp3',
    },

    {
      musicid: 4,
      songTitle: 'Animals',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Animals.mp3',
    },

    {
      musicid: 5,
      songTitle: 'Sugar',
      singerName: 'Marron 5',
      songDir: 'http://159.203.250.111/Sugar.mp3',
    }, {
      musicid: 6,
      songTitle: 'All_Right.mp3',
      singerName: 'no one it is me!',
       songDir: 'http://159.203.250.111/All_Right.mp3'
    },
    {
      musicid: 7,
      songTitle: 'Animals.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Animals.mp3'
  
     
    },

    {
      musicid: 8,
      songTitle: 'Bila.mp3',
      singerName: 'no one it is me!',
      songDir: 'http://159.203.250.111/Bila.mp3'
    },

    {
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

onLoad:function(){
  var that=this;
//musicId存在一个数组app.globalData.musicIdList[i]中
  if(app.globalData.IsReg == true){
//请求具体的音乐信息,请求10次
  var musicId = app.globalData.musicIdList[0];
  wx.request({
    musicId: app.globalData.musicIdList[0],
    url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      that.setData({
         "musicDetailList[0].songTitle": res.data.song.songTitle,
         "musicDetailList[0].singerName": res.data.singer.singerName,
         "musicDetailList[0].songDir": 'http://159.203.250.111/Good_Time.mp3'
         })
    }})
     var musicId = app.globalData.musicIdList[1];
    wx.request({
      musicId: app.globalData.musicIdList[1],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[1].songTitle": res.data.song.songTitle,
          "musicDetailList[1].singerName": res.data.singer.singerName,
          "musicDetailList[1].songDir": res.data.song.songDir
        })
    }})

    var musicId = app.globalData.musicIdList[2];
    wx.request({
      musicId: app.globalData.musicIdList[2],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[2].songTitle": res.data.song.songTitle,
          "musicDetailList[2].singerName": res.data.singer.singerName,
          "musicDetailList[2].songDir": res.data.song.songDir
        })
      }
    })
    var musicId = app.globalData.musicIdList[3];
    wx.request({
      musicId: app.globalData.musicIdList[3],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[3].songTitle": res.data.song.songTitle,
          "musicDetailList[3].singerName": res.data.singer.singerName,
          "musicDetailList[3].songDir": res.data.song.songDir
        })
      }})

    var musicId = app.globalData.musicIdList[4];
    wx.request({
      musicId: app.globalData.musicIdList[4],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[4].songTitle": res.data.song.songTitle,
          "musicDetailList[4].singerName": res.data.singer.singerName,
          "musicDetailList[4].songDir": res.data.song.songDir
        })
      }
    })

    var musicId = app.globalData.musicIdList[5];
    wx.request({
      musicId: app.globalData.musicIdList[5],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[5].songTitle": res.data.song.songTitle,
          "musicDetailList[5].singerName": res.data.singer.singerName,
          "musicDetailList[5].songDir": res.data.song.songDir
        })
      }
    })

    var musicId = app.globalData.musicIdList[6];
    wx.request({
      musicId: app.globalData.musicIdList[6],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[6].songTitle": res.data.song.songTitle,
          "musicDetailList[6].singerName": res.data.singer.singerName,
          "musicDetailList[6].songDir": res.data.song.songDir
        })
      }
    })
    var musicId = app.globalData.musicIdList[7];
    wx.request({
      musicId: app.globalData.musicIdList[7],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[7].songTitle": res.data.song.songTitle,
          "musicDetailList[7].singerName": res.data.singer.singerName,
          "musicDetailList[7].songDir": res.data.song.songDir
        })
      }
    })

    var musicId = app.globalData.musicIdList[8];
    wx.request({
      musicId: app.globalData.musicIdList[8],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[8].songTitle": res.data.song.songTitle,
          "musicDetailList[8].singerName": res.data.singer.singerName,
          "musicDetailList[8].songDir": res.data.song.songDir
        })
      }
    })

    var musicId = app.globalData.musicIdList[9];
    wx.request({
      musicId: app.globalData.musicIdList[9],
      url: "http://localhost:8080/getMusicDetail?musicId=" + musicId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          "musicDetailList[9].songTitle": res.data.song.songTitle,
          "musicDetailList[9].singerName": res.data.singer.singerName,
          "musicDetailList[9].songDir": res.data.song.songDir
        })
      }
    })
  }
}

})