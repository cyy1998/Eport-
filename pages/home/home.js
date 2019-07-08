// pages/home/home.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: '',
    userName: '',
    usertype: '',
    show_error_1: false,
    show_error_2: false,
    show_error_3: false,
    isLogin: false,
    showLogin: false,
    is_password: true,
    eye_status: 'browse',
    animation: '',
    error_message: '',
    show_error: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.loginStatus) {
      var _id=wx.getStorageSync('id');
      if(_id)
      {
        app.globalData.id=_id;
      }
      var _name=wx.getStorageSync('name');
      if(_name)
      {
        app.globalData.name=_name;
      }
      var _type=wx.getStorageSync('type');
      if(_type)
      {
        app.globalData.type=_type;
      }
      if (app.globalData.id != '') {
        app.globalData.loginStatus = true;
        this.setData({
          userID: app.globalData.id,
          userName: app.globalData.name,
          userType: app.globalData.type,
          isLogin: app.globalData.loginStatus
        });
      } else {
        console.log('路人');
        this.setData({
          userName: '路人',
          isLogin: app.globalData.loginStatus
        });
      }
    } else {
      console.log(app.globalData)
      this.setData({
        userID: app.globalData.id,
        userName: app.globalData.name,
        userType: app.globalData.type,
        isLogin: app.globalData.loginStatus
      });
    }
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

  login: function(){
    this.setData({
      showLogin: true
    });
  },
  quit: function(){
    app.globalData.loginStatus=false;
    app.globalData.name='';
    app.globalData.id='';
    app.globalData.type='';
    this.setData({
      isLogin: false,
      userName: '路人',
      userID: '',
      userType: '',
      step: 'first'
    });
    wx.setStorage({
      key: 'id',
      data: ''
    });
    wx.setStorage({
      key: 'name',
      data: ''
    });
    wx.setStorage({
      key: 'type',
      data: ''
    });
  },
  hideLogin: function(){
    this.setData({
      showLogin: false
    });
  },
  formSubmit_lo: function (e) {
    var that = this;
    console.log(e.detail.value);
    if (e.detail.value['id'] === '') {
      that.setData({
        animation: 'shake',
        error_message: '用户名不能为空',
        show_error: true
      });
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000);
    } else if (e.detail.value['password'] === '') {
      that.setData({
        animation: 'shake',
        error_message: '密码不能为空',
        show_error: true
      });
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000);
    } else {
      app.globalData.name=e.detail.value['id'];
      app.globalData.id=e.detail.value['id'];
      app.globalData.type='巡检员';
      app.globalData.loginStatus=true;
      that.setData({
        show_error: false,
        showLogin: false,
        isLogin: true,
        userName: e.detail.value['id'],
        userID: e.detail.value['id'],
        userType: '巡检员'
      });
      wx.setStorage({
        key: 'id',
        data: app.globalData.id,
        success: function(res)
        {
          console.log('yes');
        }
      });
      wx.setStorage({
        key: 'name',
        data: app.globalData.name
      });
      wx.setStorage({
        key: 'type',
        data: app.globalData.type
      });
    }
  },
  changeStatus: function () {
    if (this.data.is_password) {
      this.setData({
        is_password: false,
        eye_status: "browse_fill"
      });
    } else {
      this.setData({
        is_password: true,
        eye_status: "browse"
      });
    }
  },
})