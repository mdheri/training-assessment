var express = require('express');
var pagesModel = require('../models/page');
var userModel = require('../models/user');
var session = require('client-sessions');
var auth = require('../utils/auth');

var router = express.Router();

router.use(auth.requireLogin)

router.get('/', function(req, res, next) {
	pagesModel.find({user:req.user._id}, function (err, pages){
  		res.render('dashboard', { title: 'admin dashboard', page: pages,useremail: req.user.email});
	});
});

router.get('/addpage', function(req, res, next) {
  res.render('addpage', {title: 'addpage', urltaken:false});
});

router.get('/editaccount', function(req, res, next) {
  res.render('accountedit', {title: 'edit account', emailtaken: false, useremail: req.user.email});
});

router.post('/editaccount/save', function(req, res, next) {
	userModel.update({ _id: req.user._id }, { $set: { email: req.body.email, password:req.body.password}}, function (err, user){
		if(err) return res.render('accountedit', {title: 'edit account', emailtaken: true});
		userModel.findById(user._id,function (err, newuser) {
			req.session.user = newuser;
		});
		return res.redirect('/admin');

	});
});

router.delete('/page/:id', function(req, res) {
	pagesModel.remove({_id:req.params.id.trim()}, function (err){
		if(err) return res.send(err);
	});
	return res.end();
});

router.post('/page/:id', function(req, res) {
	pagesModel.findById(req.params.id.trim(), function (err,page){
		console.log(page.visable);
		if(err) return res.send(err);
		if(page.visable){
			pagesModel.update({_id: req.params.id.trim()}, { $set: { visable:false }}, function (err, pages){
				if(err) return res.send(err);
			});
		}else{
			pagesModel.update({_id: req.params.id.trim()}, { $set: { visable:true }}, function (err, pages){
				if(err) return res.send(err);
			});
		}
		return res.end();

	});
	return res.end();

});

router.get('/editpage/:id', function(req, res) {
	pagesModel.findById(req.params.id.trim(), function (err,page){
		res.render('editpage', {title: 'editpage', pages: page, urltaken:false, useremail: req.user.email});
	});
});

router.post('/editpage/save/:id', function(req, res) {
	pagesModel.update({_id:req.params.id.trim(),user:req.user._id},{$set: {content:req.body.content, date:Date()}}, function (err,page){
		if(err) return res.render('editpage', {title: 'editpage', pages: page, urltaken:false});
		return res.redirect('/admin');
	});
});


router.post('/addpage/:url', function(req, res) {
	var current_date = new Date(); 
	var newpage = new pagesModel({title: req.body.title , content:req.body.content,
		url:req.params.url.trim(), date:Date(), user:req.user._id, useremail:req.user.email, visable:true});
	newpage.save(function (err, page) {
		if (err) return res.render('addpage', {title: 'addpage', urltaken:true});
		res.send(page);
	});
	
});




module.exports = router;
