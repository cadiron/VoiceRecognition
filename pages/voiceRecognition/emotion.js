// pages/emotion.js 
var app = getApp();
Page({
  data: {
    j: 1,//帧动画初始图片  
     spreakingAnimation: {},//放大动画
    isSpeaking: false,//是否在录音状态 
    voices: [],//保存的音频数组  
    pauseStatus: false,//播放状态
    rebackData: 1,//情绪识别返回结果
    emoPic: "../../icon/happy.png",
    emoText: "[高兴，开心]"
  },
  //手指按下  
  touchdown: function () {
    console.log("手指按下了...")
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
        console.log(res)
        console.log("tempFilePath: " + res.tempFilePath)
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
          },
          fail:function(){
            //上传失败
            wx.showModal({
              title: '提示',
              content: '上传失败！请重新录制',
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

        //持久保存-----考虑是否保留此功能17.9.24  
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: res => {
            //持久路径  
            //本地文件存储的大小限制为 100M  
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
            _this.setData({
              filePath: savedFilePath

            })
          }
        }),

          wx.showToast({
            title: '恭喜!录音成功',
            icon: 'success',
            duration: 1000
          }),
          //获取录音音频列表  
          wx.getSavedFileList({
            success: function (res) {
              var voices = [];
              for (var i = 0; i < res.fileList.length; i++) {
                //格式化时间  
                var createTime = new Date(res.fileList[i].createTime)
                //将音频大小B转为KB  
                var size = (res.fileList[i].size / 1024).toFixed(2);
                var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
                console.log("文件路径: " + res.fileList[i].filePath)
                console.log("文件时间: " + createTime)
                console.log("文件大小: " + size)
                voices = voices.concat(voice);
              }
              _this.setData({
                voices: voices,

              })
            }
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
      j: 1
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
  //展示结果
  showResult: function (event) {
    var _this = this;
    var data = this.data.rebackData;
    console.log("进入展示函数！" + data)
    if (data == -1)//出错
    { console.log("识别失败！" + data) }
    if (data == 1) {
      _this.setData({
        emoPic:"../../icon/angry.png",
        emoText:"[生气，愤怒]"
      })
    }//angry
    if (data == 2) {
      _this.setData({
        emoPic: "../../icon/happy.png",
        emoText: "[高兴，开心]"
      })
    }//happy
    if (data == 3) {
      _this.setData({
        emoPic: "../../icon/neutral.png",
        emoText: "[中性，平静]"
      })
    }//neutral
    if (data == 4) {
      _this.setData({
        emoPic: "../../icon/sad.png",
        emoText: "[悲伤，痛苦]"
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
    return
  }, 200);

  //波纹放大,淡出动画
 
  var animation = wx.createAnimation({
    duration: 1000
  })
  //修改透明度,放大
  animation.opacity(0).scale(3, 3).step();
  this.setData({
    spreakingAnimation: animation.export()
  })

  setTimeout(function () {
    //波纹放大,淡出动画
    var animation = wx.createAnimation({
      duration: 1000
    })
    animation.opacity(0).scale(3, 3).step();//修改透明度,放大
    _this.setData({
      spreakingAnimation_1: animation.export()
    })
  }, 250)

  setTimeout(function () {
    //波纹放大,淡出动画
    var animation = wx.createAnimation({
      duration: 1000
    })
    //修改透明度,放大
    animation.opacity(0).scale(3, 3).step();
    _this.setData({
      spreakingAnimation_2: animation.export()
    })
  }, 500)

}