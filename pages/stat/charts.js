// pages/stat/charts.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
Page({
  data: {
  },
  //触摸事件
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  //创建数据
  createSimulationData: function () {
    var categories = [];
    var data = [];
    for (var i = 0; i < 5; i++) {
      categories.push('17-1-' + (i + 1));
      data.push(Math.random() * 4+1 );
    }
    return {
      categories: categories,
      data: data
    }
  },
  //更新数据
  updateData: function () {
    var simulationData = this.createSimulationData();
    var series = [{
      name: '心情曲线',
      data: simulationData.data,
      format: function (val, name) {
        return val.toFixed(2) ;
      }
    }];
    lineChart.updateData({
      categories: simulationData.categories,
      series: series
    });
  },
  //初始化页面
  onLoad: function (e) {
    var windowWidth = 500;   
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    var simulationData = this.createSimulationData();
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: simulationData.categories,
      animation: true,
      series: [{
        name: '心情曲线',
        data: simulationData.data,
        format: function (val, name) {
          return val.toFixed(2);
        }
      }],
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '心情指数',
        format: function (val) {
          return val.toFixed(2);
        },
        min: 0
      },
      width: windowWidth,
      height: 350,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  }

})