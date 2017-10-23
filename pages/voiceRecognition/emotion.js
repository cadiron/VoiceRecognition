// pages/emotion.js 
var app = getApp();
Page({
  data: {
    j: 1,//帧动画初始图片  
    isSpeaking: false,//是否正在说话  
    voices: [],//音频数组  
    pauseStatus: false,
    rebackData: 1,
    filepath:null
  },
  //手指按下  
  touchdown: function () {
    console.log("手指按下了...")
    console.log("new date : " + new Date)
    var _this = this
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音  
    wx.startRecord({
      success: res => {
        //临时路径,下次进入小程序时无法正常使用  
        var tempFilePath = res.tempFilePath;
        
        console.log("tempFilePath: " + tempFilePath)
        //上传录音文件
        wx.uploadFile({
          url: 'http://localhost:8080/upload', //仅为示例，非真实的接口地址
          filePath: tempFilePath,
          name: 'file',
          header: {
            'Cookie': app.globalData.Cookie,
            'content-type': 'multipart/form-data'

          },
          formData: {
            'user': 'test'
          },
          success: res => {
            console.log("wx.uploadFilede的success函数" + res.data);
            //标志位
            app.globalData.IsReg = true;

            //把后台传过来的数据做JSON解析
            var data = JSON.parse(res.data);

            //读取情绪识别结果
            var result = data.emotionResult;
            console.log("返回结果" + result)

            //把musicId存在全局数组musicIdList,注意这里的musicId要和返回的json中音乐数目一致
            for (var i = 0; i < 2; i++) {
              app.globalData.musicIdList[i] = data.musicList[i].musicId;
              console.log("musicId" + i + app.globalData.musicIdList[i]);
            }
            _this.setData({//将返回数据记录在全局数据rebackData中
              rebackData: result
            })
          }
        })

        //持久保存-----考虑是否保留此功能17.9.24  
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: res => {
            //持久路径  
            //本地文件存储的大小限制为 100M  
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
          }
        }),

        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })
      },

      fail: function (res) {
        //录音失败  
        wx.showModal({
          title: '提示',
          content: '录音时间过短！请重新录制',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起  
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()
  },
  //点击播放录音  
  gotoPlay: function (e) {
    var filePath = e.currentTarget.dataset.key;
    //点击开始播放  
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  showRegresult: function (event) {
    var _this = this;
    var data = this.data.rebackData;
    var arr = [5, 1, 1, 1];
    console.log("进入展示函数！" + data)
    if (data == -1)//出错
    { console.log("识别失败！" + data) }
    if (data == 1) {
      wx.navigateTo({
        arr: [1, 5, 1, 1],
        url: '../voiceRecognition/voiceReg?arr=' + arr

      })
    }//angry
    if (data == 2) {

      wx.navigateTo({
        arr: [5, 1, 1, 1],
        url: '../voiceRecognition/voiceReg?arr=' + arr


      })
    }//happy
    if (data == 3) {
      wx.navigateTo({
        arr: [1, 1, 5, 1],
        url: '../voiceRecognition/voiceReg?arr=' + arr

      })
    }//neutral
    if (data == 4) {
      wx.navigateTo({
        arr: [1, 1, 1, 5],
        url: '../voiceRecognition/voiceReg?arr=' + arr

      })
    } //sad

  }

})
//麦克风帧动画  
function speaking() {
  var _this = this;
  //话筒帧动画  
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}