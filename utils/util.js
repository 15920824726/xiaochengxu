const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const testArriveTimeDF = value => { // value: 2019-02-20 12:00
  let target = value.replace(/-/g, '/');
  var date = new Date()
  var currentTime = date.getTime()
  var targetDate = new Date(target)
  var targetTime = targetDate.getTime()
  console.log(`target is ${target};  currentTime is ${currentTime}; targetTime is ${targetTime}`)
  if (targetTime - currentTime) {
    var num = (targetTime - currentTime) / 1000 / 60 / 60;  // 小时
    console.log(`num is ${num}`)
    if (num > 48 && num < 720) {
      return true;
    }
    return false;
  }
  return false;
} 

module.exports = {
  formatTime: formatTime,
  testArriveTimeDF: testArriveTimeDF
}
