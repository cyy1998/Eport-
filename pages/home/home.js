// pages/home/home.js
const app = getApp();
const utils = require('../../utils/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userID: '',
    userName: '',
    usertype: '',
    userAvatar: '',
    show_error_1: false,
    show_error_2: false,
    show_error_3: false,
    isLogin: false,
    showLogin: false,
    is_password: true,
    eye_status: 'browse',
    animation: '',
    error_message: '',
    show_error: false,
    swiperList: [],
    bitMap: [],
    cardCur: 0,
    device: '',
    detail: '',
    phone: '',
    imgList: [],
    showInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    if(app.globalData.avatar==='')
    {
      wx.getUserInfo({
        success(res){
         console.log(res);
        }
      });
    }
    if (!app.globalData.loginStatus) {
      var _id = wx.getStorageSync('id');
      if (_id) {
        app.globalData.id = _id;
      }
      var _name = wx.getStorageSync('name');
      if (_name) {
        app.globalData.name = _name;
      }
      var _type = wx.getStorageSync('type');
      if (_type) {
        app.globalData.type = _type;
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
    var lis = [];
    if (this.data.userType == '巡检员') {
      for (var i = 0; i < 5; ++i) {
        lis.push({
          'id': i.toString(),
          'device': i.toString(),
          'detail': '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
          'phone': '123456',
          'url': ['https://i.loli.net/2019/07/08/5d23255068fe820393.jpg', 'https:\/\/i.loli.net\/2019\/07\/08\/5d23255068fe820393.jpg', 'https:\/\/i.loli.net\/2019\/07\/08\/5d23255068fe820393.jpg', 'https:\/\/i.loli.net\/2019\/07\/08\/5d23255068fe820393.jpg']
        });
      }
    }
    else{

    }
    this.setData({
      swiperList: lis
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {
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

  login: function () {
    this.setData({
      showLogin: true
    });
  },
  quit: function () {
    app.globalData.loginStatus = false;
    app.globalData.name = '';
    app.globalData.id = '';
    app.globalData.type = '';
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
  hideLogin: function () {
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
      wx.showLoading({
        title: '登陆中',
        mask: true
      })
      wx.request({
        url: 'https://tjsseibm.club/api/mobile/login',
        method: 'POST',
        data: {
          id: e.detail.value['id'],
          password: e.detail.value['password']
        },
        success(res){
          console.log(res);
          
        },
        complete(){
          wx.hideLoading();
        }
      });

      var password=utils.hex_md5(e.detail.value['password']);
      console.log(password);
      app.globalData.name = e.detail.value['id'];
      app.globalData.id = e.detail.value['id'];
      app.globalData.type = '巡检员';
      app.globalData.loginStatus = true;
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
        success: function (res) {
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
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  showInformation: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    console.log(id);
    that.setData({
      imgList: [],
      bitMap: [],
    });
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var bit=[];
    for (var i = 0; i < this.data.swiperList[id]['url'].length; ++i)
    {
      bit.push(0);
    }
    that.setData({
      bitMap: bit
    });
    for(var i=0; i<this.data.swiperList[id]['url'].length; ++i)
    {
      this.downloadData(id,i,that);
    }
    
    this.setData({
      device: this.data.swiperList[id]['device'],
      detail: this.data.swiperList[id]['detail'],
      phone: this.data.swiperList[id]['phone'],
      showInfo: true
    });
  },
  hideInformation: function () {

    this.setData({
      showInfo: false
    })
  },
  ViewImage: function (e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  Edit: function () {
    var that = this;
    var urlPath = String();
    for (var i = 1; i < 5; ++i) {
      if (i - 1 < this.data.imgList.length) {
        urlPath += '&url' + i.toString() + '=' + this.data.imgList[i - 1];
      } else {
        urlPath += '&url' + i.toString() + '=';
      }
    }
    wx.navigateTo({
      url: '../index/index?deviceID=' + this.data.device + '&phone=' + this.data.phone + '&detail=' + this.data.detail +
        urlPath,
      success: function (res) {
        that.hideInformation();
      }

    });
  },
  downloadData: function(id,idx,that){
    wx.downloadFile({
      url: that.data.swiperList[id]['url'][idx],
      success(res) {
        var lis = that.data.imgList;
        lis.push(res.tempFilePath);
        var b=that.data.bitMap;
        b[idx]=1;          
        that.setData({
          imgList: lis,
          bitMap: b
        });
        var flag=1;
        for(var x=0;x<that.data.bitMap.length;++x)
        {
          flag=flag*that.data.bitMap[x];
        }
        if(flag!=0)
        {
          wx.hideLoading();
        }
      }
    });
  },
  Scan: function(){
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode', 'qrCode', 'datamatrix','pdf417'],
      success: res=>{
        console.log(res);
        if(res['path']===undefined)
        {
          return;
        }
        var path=res['path'];
        var reg=/deviceID=(\d)+/;
        console.log(path.match(reg))
        var id=path.match(reg)[0].slice(9);
        wx.navigateTo({
          url: '../employee/employee?deviceID='+id
        });
      }
    });
  },
  turnMap: function(){
    wx.navigateTo({
      url: '../map/map'
    });
  }
})