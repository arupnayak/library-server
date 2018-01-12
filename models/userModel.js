var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userModel = new Schema({
    username: String,
    password: Object,
    email : String,
    info: String
});

module.exports= mongoose.model('User', userModel);