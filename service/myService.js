const app = getApp();
const http = require('http.js');

var users = function (id, success, error) {
  const url = `${app.api.baseApiUrl}/saianapi/v1/users/${id}`
  http.request(url, 'GET').then(res => {
    success(res.data)
  }, err => {
    error(err)
  })
}

var project = function (success, error) {
  const url = app.api.baseApiUrl + '/saianapi/v1/project_apps'
  http.request(url, 'GET').then(res => {
    success(res.data)
  }, err => {
    error(err)
  })
}


module.exports.users = users
module.exports.project = project
