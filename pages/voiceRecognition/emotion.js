// pages/emotion.js

Page({
    data:  {
        j:  1,//帧动画初始图片  
        isSpeaking:  false,//是否正在说话  
        voices:  [],//音频数组  
        pauseStatus:false,
        rebackData:-1
    },
    //手指按下  
    touchdown:  function  ()  {
        console.log("手指按下了...")
        console.log("new date : "  +  new  Date)
         var _this=this
        speaking.call(this);
        this.setData({
            isSpeaking:  true
        })
        //开始录音  
        wx.startRecord({
            that:this,
            success:res=>{
                //临时路径,下次进入小程序时无法正常使用  
                var  tempFilePath  =  res.tempFilePath
                console.log("tempFilePath: "  +  tempFilePath)
                //上传录音文件
                wx.uploadFile({
                  url: 'http://localhost:8080/upload', //仅为示例，非真实的接口地址
                  filePath: tempFilePath,
                  name: 'file',
                  header: {
                    'content-type': 'multipart/form-data'
                  },
                  formData: {
                    'user': 'test'
                  },
          
                  success:res=> {
                    console.log("wx.uploadFilede的success函数")
                    var data = res.data
                    console.log("发送成功,返回数据data")
                    _this.setData({//将返回数据记录在全局数据rebackData中
                      rebackData:1
                    })

                  }
                })
                //持久保存-----考虑是否保留此功能17.9.24  
                wx.saveFile({
                    tempFilePath:  tempFilePath,
                    success:  function  (res)  {
                        //持久路径  
                        //本地文件存储的大小限制为 100M  
                        var  savedFilePath  =  res.savedFilePath
                        console.log("savedFilePath: "  +  savedFilePath)
                    }
                })
                wx.showToast({
                    title:  '恭喜!录音成功',
                    icon:  'success',
                    duration:  1000
                })
                //获取录音音频列表  
                wx.getSavedFileList({
                    success:  function  (res)  {
                        var  voices  =  [];
                        for  (var  i  =  0;  i  <  res.fileList.length;  i++)  {
                            //格式化时间  
                            var  createTime  =  new  Date(res.fileList[i].createTime)
                            //将音频大小B转为KB  
                            var  size  =  (res.fileList[i].size  /  1024).toFixed(2);
                            var  voice  =  {  filePath:  res.fileList[i].filePath,  createTime:  createTime,  size:  size  };
                            console.log("文件路径: "  +  res.fileList[i].filePath)
                            console.log("文件时间: "  +  createTime)
                            console.log("文件大小: "  +  size)
                            voices  =  voices.concat(voice);
                        }
                        _this.setData({
                            voices:  voices
                        })
                    }
                })
            },
            fail:  function  (res)  {
                //录音失败  
                wx.showModal({
                    title:  '提示',
                    content:  '录音时间过短！请重新录制',
                    showCancel:  false,
                    success:  function  (res)  {
                        if  (res.confirm)  {
                            console.log('用户点击确定')
                            return
                        }
                    }
                })
            }
        })
    },
    //手指抬起  
    touchup:  function  ()  {
        console.log("手指抬起了...")
        this.setData({
            isSpeaking:  false,
        })
        clearInterval(this.timer)
        wx.stopRecord()
    },
    //点击播放录音  
    gotoPlay:  function  (e)  {
        var  filePath  =  e.currentTarget.dataset.key;
        //点击开始播放  
        wx.showToast({
            title:  '开始播放',
            icon:  'success',
            duration:  1000
        })
        wx.playVoice({
            filePath:  filePath,
            success:  function  ()  {
                wx.showToast({
                    title:  '播放结束',
                    icon:  'success',
                    duration:  1000
                })
            }
        })
    },

    showRegresult:function(event){
      var _this=this;
      var data = this.data.rebackData;
     if(data==-1)//出错
     {console.log("识别失败！")
     
     }
     if (data = 0) { }//angry
     if (data = 1) { }//fear
     if (data = 2) { }//happy
     if (data = 3) { } //sad

     }
    
  })
//麦克风帧动画  
function  speaking()  {
    var  _this  =  this;
    //话筒帧动画  
    var  i  =  1;
    this.timer  =  setInterval(function  ()  {
        i++;
        i  =  i  %  5;
        _this.setData({
            j:  i
        })
    },  200);
}