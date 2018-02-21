var mongoose = require('mongoose');



var schema = mongoose.Schema({
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true} 
});

var model = mongoose.model('User', schema);

module.exports = model;

