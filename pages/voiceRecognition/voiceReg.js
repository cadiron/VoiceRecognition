// pages/voiceReg.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var radarChart = null;
Page({
  data: {
    arr: [10, 150, 10, 10]
  },
  onLoad:function(e){
    var that = this;
    console.log("Onload函数内部" + e.arr) 
    that.setData({
      arr:e.arr
    })
  },
  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },
  onReady: function (e) {

    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    radarChart = new wxCharts({

      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['happy', 'angry', 'neutral', 'sad'],
      series: [{
        name: '心情统计',
        data: [150, 10, 10, 10]
      }],
      width: windowWidth,
      height: 400,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  }


})