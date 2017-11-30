var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserInfo = new Schema({
  userID: {
    type: String
  },
  userEmail: {
    type: String
  },
  userPassword: {
    type: String
  }
},{
    collection: 'UserInfos'
})

module.exports = mongoose.model('UserInfo', UserInfo);
