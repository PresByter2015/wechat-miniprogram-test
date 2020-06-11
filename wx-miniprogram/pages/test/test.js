// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movelist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.movelist)
  },
  getDataList() {
    const _this = this
    wx.request({
      url: 'https://api.douban.com/v2/movie/top250?start=0&count=4000&apikey=0df993c66c0c636e29ecbb5344252a4a', //仅为示例，并非真实的接口地址
      data: {
        count: 500
      },
      header: {
        'content-type': 'json' // 默认值
      },
      success(res) {
        console.log(res.data.subjects)
        _this.setData({
          movelist: res.data.subjects
        })
      }
    })
  },
  handleChecked(e) {
    const checkedId = e.currentTarget.dataset.id
    const movelist = this.data.movelist
    this.setData({
      movelist: movelist.map(v => {
        return v.id === checkedId ? {...v,checked:!v.checked} : {...v}
      })
    })
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

  }
})