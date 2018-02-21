var mongoose = require('mongoose');



var schema = mongoose.Schema({
    email: {type: String, required: true, unique:true},
    username: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    following: {type: Array, required: false}
});

var model = mongoose.model('User', schema);

module.exports = model;

