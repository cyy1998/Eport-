// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    markers: [],
    scale: 18,
    ismarker: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var pages = getCurrentPages();
    var home = pages[pages.length - 2];
    var lis = [];
    var name = (home.data.userType === '巡检员') ? '报修单' : '工单';
    for (var i = 0; i < home.data.swiperList.length; ++i) {
      lis.push({
        id: i.toString(),
        latitude: parseFloat(home.data.swiperList[i]['position']['latitude']),
        longitude: parseFloat(home.data.swiperList[i]['position']['longtitude']),
        iconPath: '../../img/icon.png',
        callout: {
          bgColor: '#0081ff',
          color: '#ffffff',
          padding: 5.0,
          borderRadius: 10.0,
          content: '设备编号：' + home.data.swiperList[i]['device'] + '\n' + name + '编号：' + home.data.swiperList[i]['id']
        }
      })
    }
    console.log(lis);
    that.setData({
      markers: lis,
      ismarker: true
    });
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      }
    })

  },

  Position: function () {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          scale: 18
        })
      }
    })
  },

  Add: function () {
    if (this.data.scale < 19) {
      this.data.scale += 1;
      this.setData({
        scale: this.data.scale
      });
    }
  },
  Minus: function () {
    if (this.data.scale > 3) {
      this.data.scale -= 1;
      this.setData({
        scale: this.data.scale
      });
    }
  }
})