// pages/video/video.js
function getRandomColor () {
  let rgb = []
  for (let i = 0 ; i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color = color.length == 1 ? '0' + color : color
    rgb.push(color)
  }
  return '#' + rgb.join('')
}

Page({
   onLoad:function(options){
    var that = this;    
    wx.getSystemInfo({
      success: function(res) {
        //console.log(res.windowHeight)
        that.setData({scrollHeight:res.windowHeight-350});
      }
    });
  },
  onReady: function (res) {
    this.videoContext = wx.createVideoContext('myVideo')
  },
  inputValue: '',
  data: {
    id:1,
    src: 'http://jafish.online/video/fuhei.mp4',
    danmuList: [
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
      },
      {
        text: '第 5s 出现的弹幕',
        color: '#0000ff',
        time: 5
      },
      {
        text: '第 7s 出现的弹幕',
        color: '#ffff00',
        time: 7
      }],
      videoList:[
        {
          id:1,
          src: 'http://jafish.online/video/fuhei.mp4',
          poster:'http://jafish.online/video/image/fuhei.jpg',
          name:'康娜酱竟隐藏着腹黑的一面'
        },
        {
          id:2,
          src: 'http://jafish.online/video/luoli.mp4',
          poster:'http://jafish.online/video/image/luoli.jpg',
          name:'这就是萝莉控的原因之一'
        },
        {
          id:3,
          src: 'http://jafish.online/video/duoluo.mp4',
          poster:'http://jafish.online/video/image/duoluo.jpg',
          name:'珈百璃的堕落OP'
        },
        {
          id:4,
          src: 'http://jafish.online/video/sata.mp4',
          poster:'http://jafish.online/video/image/sata.jpg',
          name: '萨塔喵真是太可爱了'
        },
        {
          id:5,
          src: 'http://jafish.online/video/emp.mp4',
          poster:'http://jafish.online/video/image/emo.jpg',
          name: '笨蛋恶魔真是太可爱了'
        },
        {
          id:6,
          src: 'http://jafish.online/video/baihe.mp4',
          poster:'http://jafish.online/video/image/baihe.jpg',
          name:'一月番是你的百合'
        }
      ],
      value:''
  },
  bindInputBlur: function(e) {
    this.inputValue = e.detail.value;
  },
  bindSendDanmu: function () {
    this.videoContext.sendDanmu({
      text: this.inputValue,
      color: getRandomColor()
    });
    
    console.log(this.data.value)
    this.setData({value:''});
  },
  playvideo:function (e) {
    var that = this;
    //console.log(e)
    var index = e.target.dataset.idx;
    //console.log(index);
    if(index != undefined){
      //console.log(this.data.src,this.data.videoList[index].src)

     
     this.setData({
       id:this.data.videoList[index].id,
       src:this.data.videoList[index].src
       });
     setTimeout(function(){
        that.videoContext.play();
      },500)
      
    }
  },
  videoEnd:function () {
    var that = this;
    var num = 0;
    var id = this.data.id;

    if(id >= this.data.videoList.length){
      num = 0;
    }else{
      num = id;
    }

    this.setData({
      id:this.data.videoList[num].id,
      src:this.data.videoList[num].src
    });

    setTimeout(function(){
        that.videoContext.play();
      },500)
  },
  onHide:function(){
    this.videoContext.pause();
  }
})