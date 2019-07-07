//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    CustomBar: app.globalData.CustomBar,
    device: '',
    current: 'brush',
    animation: '',
    userName: '',
    userID: '',
    userType: '',
    hasUserInfo: false,
    show_error_1: false,
    show_error_2: false,
    show_error_3: false,
    isLogin: false,
    showLogin: false,
    imgList: [],
    accessories:[],
    step: 'first',
    detail: '',
    modalName: '',
    is_password: true,
    eye_status: 'browse',
    animation: '',
    error_message: '',
    show_error: false
  },
  handleChange({
    detail
  }) {
    this.setData({
      current: detail.key
    });
  },
  //事件处理函数

  onLoad: function (options) {
    var _device = options['deviceID'];
    this.setData({
      device: _device
    });
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
  ChooseImage: function () {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage: function () {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    });
  },
  textareaInput: function (e) {
    this.setData({
      detail: e.detail.value
    });
  },
  formSubmit: function (e) {
    var that = this;
    var flag = false;
    console.log(e.detail.value);
    if (e.detail.value['phone'] === '') {
      that.setData({
        show_error_3: true
      });
      flag = true;
    }
    if (e.detail.value['problem'] == '') {
      that.setData({
        show_error_2: true
      });
      flag = true;
    }
    if (that.data.imgList.length === 0) {
      that.setData({
        show_error_1: true
      });
      flag = true;
    }
    if (flag) {
      if (e.detail.value['phone'] != '') {
        that.setData({
          show_error_3: false
        });
      }
      if (e.detail.value['problem'] != '') {
        that.setData({
          show_error_2: false
        });
      }
      if (that.data.imgList.length != 0) {
        that.setData({
          show_error_1: false
        });
      }
      that.setData({
        animation: 'shake'
      })
      setTimeout(function () {
        that.setData({
          animation: ''
        })
      }, 1000);
    } else {
      that.setData({
        show_error_1: false,
        show_error_2: false,
        show_error_3: false
      });
    }
  },
  showModal: function(){
    this.setData({
      modalName: 'DrawerModal'
    });
  },
  hideModal: function(){
    this.setData({
      modalName: ''
    });
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
  nextStep: function() {
    this.setData({
      page: true,
      step: 'second'
    });
  },
  prevStep: function(){
    this.setData({
      page: false,
      step: 'first'
    });
  }
})