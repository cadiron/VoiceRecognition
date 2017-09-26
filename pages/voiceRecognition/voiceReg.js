// pages/voiceReg.js

var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var radarChart = null;
Page({
  data: {
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
      categories: ['喜', '怒', '哀', '惧'],
      series: [{
        name: '心情统计',
        data: [90, 110, 125, 95]
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