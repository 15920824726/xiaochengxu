var app = getApp()
var request = function(url, method, data) {
    data = data || {}
    var token = app.token ? app.token : wx.getStorageSync('token')
    var user = app.userInfo ? app.userInfo : wx.getStorageSync('user')
    var header = {}
    if (user && token) {
        header = {
            'Authorization': 'Token token=' + token + ',identity=' + user.id
        }
    }
    header = header || {};
    var promise = new Promise(function(resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method ? method : 'GET',
            header: header,
            success: resolve,
            fail: reject
        })
    });
    return promise;
};

module.exports.request = request