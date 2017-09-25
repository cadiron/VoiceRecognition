// pages/stat/charts.js
Page({
  data: {
  
  },
onLoad:function(){
  var wxCharts = require('wxcharts.js')
  new wxCharts({
    canvasId: 'pieCanvas',
    type: 'pie',
    series: [{
      name: 'cat1',
      data: 50,
    }, {
      name: 'cat2',
      data: 30,
    }, {
      name: 'cat3',
      data: 1,
    }, {
      name: 'cat4',
      data: 1,
    }, {
      name: 'cat5',
      data: 46,
    }],
    width: 360,
    height: 300,
    dataLabel: true
  })
}
  

})