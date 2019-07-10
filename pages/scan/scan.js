// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  Scan: function () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode', 'datamatrix', 'pdf417'],
      success: res => {
        console.log(res);
        if (res['path'] === undefined) {
          this.setData({
            showModal: true
          })
          console.log('fail');
          return;
        }
        var path = res['path'];
        var reg = /deviceID=(\d)+/;
        var r = path.match(reg)
        if (r === null) {
          this.setData({
            showModal: true
          })
          console.log('fail2');
          return;
        }
        var id = r[0].slice(9);
        wx.navigateTo({
          url: '../index/index?deviceID=' + id + '&detail=&phone=&url1=&url2=&url3=&url4='
        });
      }
    })
  },
  hideModal: function(){
    this.setData({
      showModal: false
    });
  }
})