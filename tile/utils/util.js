function formatTime(date) {
  if(typeof date == 'string'){
    if(date.length==10) date = date * 1000;
    date = new Date(date);
  }

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function showRequestFailedTip() {
    wx.showModal({
        title: '提示',
        content: '网络错误，请重试！',
        showCancel: false,
        success: function(res) {
        }
    });
}

module.exports = {
  formatTime: formatTime
}
