//index.js
Page({
  data:{
    newList:[],
    nowNew:{},
    num:0,
    hidden:false,
    bestop:true
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this;
    this.setData({newList:[],num:0});
    var page = Math.ceil(Math.random()*10);
    this.getNews(page);
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    this.onLoad();
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    if(this.data.bestop){
      this.setData({hidden:false,bestop:false});
      var page = Math.ceil(Math.random()*50);
      this.getNews(page);
    }
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  },
  newsItem:function (e) {
    //console.log(e.target);
    var newsid = e.target.id;
    var page = e.target.dataset.page;
    for (var i=0;i<this.data.newList.length;i++){
      if(newsid === this.data.newList[i].news_id){
        //console.log(newsid);
        wx.navigateTo({
          url: '../item/item?news_id='+newsid
        })
      }
    }
  },
  getNews : function(page){
    var that = this;
    var nums = this.data.num;

    wx.request({
      url: 'http://api.dagoogle.cn/news/get-news?page='+page,
      method: 'GET',
      success: function(res){
        //console.log(res);
        var id = 0;
        var list = that.data.newList;
        for(var i = 0; i < res.data.data.length; i++){
           list.push(res.data.data[i]);
           //console.log(list)
           id = page + '-' + list[i+(nums*15)].news_id;
           list[i+(nums*15)].news_id = id;
        }
        nums++;
        that.setData({
          newList:list,
          num:nums,
          hidden:true,
          bestop:true
        });
        wx.stopPullDownRefresh();
        //console.log(that.data.num)
      }
    })
  }
})
