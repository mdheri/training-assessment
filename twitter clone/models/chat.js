var mongoose = require('mongoose');

var schema = mongoose.Schema({
    chat: {type: String, required: true},
    date: {type: String, required: true},
    usersent: {type: String, required: true},
    userrecieved: {type: String, required: true},
});

var model = mongoose.model('Chat', schema);

module.exports = model;
