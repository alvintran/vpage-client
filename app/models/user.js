var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  name: String,
  nickname: String,
  avatar: String,
  phone: String,
  address: String
});

module.exports = mongoose.model('User', UserSchema);