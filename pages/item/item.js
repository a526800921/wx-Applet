// pages/item/item.js
Page({
  data:{
    newList:{},
    newsid:0,
    page:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    //console.log(options);
    var str = options.news_id;
    var page_id = str.split('-');
    //console.log(page_id)
    var that = this;
    if(options){
      this.setData({
        newsid:page_id[1],
        page:page_id[0]
      })
    }

    wx.request({
      url: 'http://api.dagoogle.cn/news/get-news?page='+that.data.page,
      method: 'GET',
      success: function(res){
        //console.log(res);
        for(var i=0;i<res.data.data.length;i++){
           if(that.data.newsid === res.data.data[i].news_id){
             //console.log(news_id);
             var item = res.data.data[i];
             //console.log(item);
             item.content = item.content.replace(/^\n.*<!--.*-->/g,'');
             item.content = item.content.replace(/<img.*\/>/ig,"");
             item.content = item.content.replace(/<br\/>/ig,"\n");
             item.content = item.content.replace(/\&nbsp\;/ig,"");
             item.content = item.content.replace(/<b>/ig,"");
             item.content = item.content.replace(/<\/b>/ig,"");
             item.content = item.content.replace(/<strong>/ig,"");
             item.content = item.content.replace(/<\/strong>/ig,"");
             item.content = item.content.replace(/^\s/g,"");
              //item.content = `item.content`;

             //console.log(item.content);
             that.setData({newList:item});
             //console.log(that.data.newList);
           }
        }
      }
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})