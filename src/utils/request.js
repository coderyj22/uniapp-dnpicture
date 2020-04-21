export default (params) => {
  // 加载中
  uni.showLoading({
    title: "正在玩命加载……"
  })

  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        reject(err)
      },
      complete() {
        uni.hideLoading()
      }
    })
  })
}
