// app/models/tweet.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var tweetSchema = new Schema({
    Nom: String,
    Text: String,
    Date: String,
    Geolocalisation: String
});

module.exports = mongoose.model('Tweet', tweetSchema);