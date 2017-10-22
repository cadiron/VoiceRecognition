// pages/stat/charts.js
var wxCharts = require('../../utils/wxcharts.js');
var util = require('../../utils/util.js');
var app = getApp();
var radarChart = null;
var Cookie = app.globalData.Cookie; 

Page({
  data: {
    arr: [8, 5, 2,4]
  },

  onLoad: function (e) {
    wx.request({
      url: 'http://localhost:8080/checkUser?account=' + 'wangzi' + '&userId=' + '1',
      header: {
        'Cookie':app.globalData.Cookie,
        'content-type': 'application/json' // 默认值
      },
      success: res => {
        console.log("发送用户信息成功" + app.globalData.userId)
      }
    })
    
    var that = this;
    console.log("Onload函数内部" + e.arr)
    that.setData({
      arr: e.arr
    })
  },

  touchHandler: function (e) {
    console.log(radarChart.getCurrentDataIndex(e));
  },

   //创建数据
  createSimulationData: function () {
    var name = null;
    var data = [1,1,1,1];
  //获取当前日期
    var dateBg = util.myTime(new Date())+""; 
    var dateEd = util.myFormatTime(new Date())+""; 
    name = dateBg+"-"+dateEd+"心情统计"
    console.log("Cookie" + app.globalData.Cookie)
    
    // wx.request({
    //   url: 'http://localhost:8080/checkUser?account=' + 'wangzi' + '&userId=' + '1',
    //   header: {
    //     'Cookie': Cookie,
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: res => {
    //     console.log("发送用户信息成功" + app.globalData.userId)
    //   }
    // })
    //发送情绪统计请求
    wx.request({
      url: 'http://localhost:8080/EmotionStatistics?dateBegin='+dateBg+'&dateEnd='+dateEd,
      header: {
        'Cookie': app.globalData.Cookie,
        'content-type': 'application/json' // 默认值
      },
      success:res=>{
        console.log("返回json数据" + res)
        console.log("返回json数据"+res.data)
        console.log("返回json数据" + res.data.tagIdMap)
        //把后台传过来的数据做JSON解析
        var data = JSON.parse(res.data);
        console.log("heheh" + data)
        
      }
    })
    return {
      name:name,
      data: data
    }
  },
  //更新数据
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: simulationData.name,
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) ;
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
          max: 10
        }
      }
    });
  }


})