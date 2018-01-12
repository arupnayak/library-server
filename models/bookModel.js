var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var bookModel = new Schema({
    title: String,
    description: String,
    author: String,
    isbn : String,
    thumbnail: String,
    smallThumbnail: String,
    read: {type: Boolean, default:false},
    user : Schema.Types.ObjectId,
    issuedTo : Schema.Types.ObjectId
});

module.exports= mongoose.model('Book', bookModel);