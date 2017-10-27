// pages/stat/charts.js
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp();
var radarChart = null;

Page({
  data: {
    simulationDataName: '2017/09/23-2017/10/23心情统计',
    simulationDataData: [8, 5, 2, 4],
    arr: [8, 5, 2, 4]
  },

  onLoad: function (e) {
    var that = this;
    that.setData({
      arr: e.arr
    })
  },

  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },

  //创建数据
  createSimulationData: function () {
    var _that = this;
    var name = null;
    var data = [4, 3, 7, 1];
    //获取tagIdMap
    var showArr = [0, 0, 0, 0]
    var tagArr = [];
    //获取当前日期
    var dateBg = util.myTime(new Date()) + "";
    var dateEd = util.myFormatTime(new Date()) + "";
    name = dateBg + "-" + dateEd 
    _that.setData({//将返回数据记录在全局数据rebackData中
      simulationDataName: name
    })
    console.log("Cookie" + app.globalData.Cookie)

    //发送情绪统计请求
    wx.request({
      url: 'http://localhost:8080/EmotionStatistics?dateBegin=' + dateBg + '&dateEnd=' + dateEd,
      header: {
        'Cookie': app.globalData.Cookie,
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        tagArr = res.data.tagIdMap;
        for (let key in tagArr) {
          console.log('key: ' + key + ' = ' + tagArr[key]);
          if (tagArr[key] == 1)
          { showArr[0] += 1; }
          if (tagArr[key] == 2)
          { showArr[1] += 1; }
          if (tagArr[key] == 3)
          { showArr[2] += 1; }
          if (tagArr[key] == 4)
          { showArr[3] += 1; }
        }
        console.log("返回json数据中tagIdMap" + showArr)
        _that.setData({//将返回数据记录在全局数据rebackData中
          simulationDataData: showArr
        })
      }
    })
  },
  //更新数据
  updateData: function () {
    var that = this;
    var simulationData = this.createSimulationData();
    console.log("更新的data数据" + that.data.simulationDataData)
    var series = [{
      name: that.data.simulationDataName,
      data: that.data.simulationDataData,
      format: function (val, name) {
        return val.toFixed(2);
      }
    }];
    radarChart.updateData({
      series: series
    });
  },
  onReady: function (e) {

    var windowWidth = 500;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    //绘图
    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: ['happy', 'angry', 'neutral', 'sad'],
      series: [{
        name: '每月心情统计',
        data: [8, 6, 2, 4]
      }],
      width: windowWidth,
      height: 300,

      extra: {
        radar: {
          max: 25
        }
      }
    });
  }


})