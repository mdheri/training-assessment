var mongoose = require('mongoose');


var schema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    url: {type: String, required: true, unique:true},
    date: {type: String, required: true},
    user: {type: String, required: true},
    useremail: {type: String, required: true},
    visable: {type: Boolean, required: true}
});

var model = mongoose.model('Page', schema);

module.exports = model;
