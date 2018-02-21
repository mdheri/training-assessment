var mongoose = require('mongoose');

var schema = mongoose.Schema({
    content: {type: String, required: true},
    date: {type: String, required: true},
    userid: {type: String, required: true},
    username: {type: String, required: true},
    likes: {type: Array, required: false}
});

var model = mongoose.model('Tweet', schema);

module.exports = model;
