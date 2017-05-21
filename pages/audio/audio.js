// pages/audio/audio.js

import Lyrics from './data.js'
var lyric = Lyrics;

Page({
  num: 0,
  data: {
    nowPlay: {
      id: 1,
      poster: 'http://jafish.online/audio/img/jinlichao.jpg',
      name: '锦鲤抄',
      author: '银临/云の泣',
      src: 'http://jafish.online/audio/music/jinlichao.mp3'
    },
    timer: null,
    bestop: true,
    plays: true,
    playPause: true,
    listTop: 100,
    pauseStatus: true,
    scrollHeight: 0,
    Lyric: '欢迎来到音乐频道',
    lyricAll: '',
    animationData: {},
    musicList: [
      {
        id: 1,
        poster: 'http://jafish.online/audio/img/jinlichao.jpg',
        name: '锦鲤抄',
        author: '银临/云の泣',
        src: 'http://jafish.online/audio/music/jinlichao.mp3'
      },
      {
        id: 2,
        poster: 'http://jafish.online/audio/img/changanyi.jpg',
        name: '长安忆',
        author: '双笙',
        src: 'http://jafish.online/audio/music/changanyi.mp3'
      },
      {
        id: 3,
        poster: 'http://jafish.online/audio/img/qiansixi.jpg',
        name: '牵丝戏',
        author: '银临/aki阿杰',
        src: 'http://jafish.online/audio/music/qiansixi.mp3'
      },
      {
        id: 4,
        poster: 'http://jafish.online/audio/img/shanshuizhijian.jpg',
        name: '山水之间',
        author: '许嵩',
        src: 'http://jafish.online/audio/music/shanshuizhijian.mp3'
      },
      {
        id: 5,
        poster: 'http://jafish.online/audio/img/shuangxueqiannian.jpg',
        name: '霜雪千年',
        author: '萧忆情',
        src: 'http://jafish.online/audio/music/shuangxueqiannian.mp3'
      }]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;


    wx.getSystemInfo({
      success: function (res) {
        //console.log(res.windowHeight)
        that.setData({ scrollHeight: res.windowHeight - 100 });
        //console.log(that.data.scrollHeight)
      }
    });


  },
  onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio');

    this.lyricRun();
  },
  playMusic: function (e) {
    if (this.data.bestop) {
      this.setData({ bestop: false });
      var that = this;
      //console.log(e)
      var index = e.target.dataset.idx;
      //console.log(index);
      if (index != undefined) {
        this.setData({
          nowPlay: this.data.musicList[index],
          Lyric: '欢迎来到音乐频道'
        });

        this.shutDown();
        this.closeList();
        clearInterval(this.data.timer)
        this.data.timer = setTimeout(function () {
          that.lyricRun();
          that.audioCtx.play();
          that.startUp();
          that.setData({
            bestop: true
          })
        }, 500)

      }
    }
  },
  test: function () {
    this.audioCtx.seek(300)
  },
  endMusic: function () {
    var that = this;
    var num = 0;
    var id = this.data.nowPlay.id;
    //console.log(id)

    if (id >= this.data.musicList.length) {
      num = 0;
    } else {
      num = id;
    }
    this.shutDown();
    this.setData({
      nowPlay: this.data.musicList[num],
      Lyric: '欢迎来到音乐频道'
    });
    setTimeout(function () {
      that.lyricRun();
      that.audioCtx.play();
      that.startUp();
    }, 500)
  },
  funtimeupdate: function (e) {
    //console.log(u.detail.currentTime);
    var currentTime = parseInt(e.detail.currentTime);
    this.setData({ Lyric: this.data.lyricAll[currentTime] });
  },
  lyricRun: function () {
    function parseLyric(lrc) {
      var lyrics = lrc.split("\n");
      var lrcObj = {};
      for (var i = 0; i < lyrics.length; i++) {
        var lyric = decodeURIComponent(lyrics[i]);
        var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        var timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        var clause = lyric.replace(timeReg, '');
        for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
          var t = timeRegExpArr[k];
          var min = Number(String(t.match(/\[\d*/i)).slice(1)),
            sec = Number(String(t.match(/\:\d*/i)).slice(1));
          var time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
      return lrcObj;
    }

    var id = 'id' + this.data.nowPlay.id;

    //console.log(id)
    this.setData({ lyricAll: parseLyric(lyric[id]) });
    //console.log(this.data.lyricAll)
  },
  audioPlay: function () {
    if (this.data.playPause) {
      this.audioCtx.play();
      this.startUp();
    } else {
      this.audioCtx.pause();
      this.shutDown();
    }
  },
  audioPrev: function () {
    if (this.data.bestop) {
      this.setData({ bestop: false });
      var that = this;
      //console.log(this.data.nowPlay.id)
      var idx = this.data.nowPlay.id - 1;
      var maxId = this.data.musicList.length - 1;
      if (idx <= 0) {
        idx = maxId;
      } else {
        idx--;
      }
      var newPlay = this.data.musicList[idx];
      //console.log(newPlay)
      this.setData({
        nowPlay: newPlay,
        Lyric: '欢迎来到音乐频道'
      });

      this.shutDown();
      clearInterval(this.data.timer)
      this.data.timer = setTimeout(function () {
        that.lyricRun();
        that.audioCtx.play();
        that.startUp();
        that.setData({
          bestop: true
        })
      }, 500)
    }
  },
  audioNext: function () {
    if (this.data.bestop) {
      this.setData({ bestop: false });

      var that = this;
      //console.log(this.data.nowPlay.id)
      var idx = this.data.nowPlay.id - 1;
      var maxId = this.data.musicList.length - 1;
      if (idx >= maxId) {
        idx = 0
      } else {
        idx++;
      }
      var newPlay = this.data.musicList[idx];
      //console.log(newPlay)
      this.setData({
        nowPlay: newPlay,
        Lyric: '欢迎来到音乐频道'
      });

      this.shutDown();
      clearInterval(this.data.timer)
      this.data.timer = setTimeout(function () {
        that.lyricRun();
        that.audioCtx.play();
        that.startUp();
        that.setData({
          bestop: true
        })
      }, 500)

    }
  },
  openList: function () {
    var animation = wx.createAnimation({
      timingFunction: "ease"
    })

    this.animation = animation;

    animation.top(0).step();

    this.setData({
      animationData: animation.export()
    })
  },
  closeList: function () {
    this.animation.top('-100%').step();
    this.setData({
      animationData: this.animation.export()
    })
  },
  startUp: function () {
    this.setData({
      plays: false,
      pauseStatus: false,
      playPause: false
    })
  },
  shutDown: function () {
    this.setData({
      plays: true,
      pauseStatus: true,
      playPause: true
    })
  }
})





