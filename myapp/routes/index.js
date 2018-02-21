var express = require('express');
var User = require('../models/user');
var pagesModel = require('../models/page');
var auth = require('../utils/auth');
var cors = require('cors')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.user) value = true;
	else value = false;
	pagesModel.find({visable:true}, function(err,allpages){
  		res.render('home', { title: 'home',pages:allpages, admin: value});
	});
});

router.get('/auth', function(req, res, next) {
  res.render('auth', { title: 'auth', incorrectpass: false, 
  						notfound: false, emailtaken: false });
});


router.post('/auth/register', function(req, res, next) {
	User.findOne({email:req.body.email},function (err, user) {
		if(user!=null)return res.render("auth", { title: 'auth',incorrectpass: false,
												notfound: false, emailtaken: true});
		var newuser = new User({ email: req.body.email , password:req.body.password  });
		newuser.save(function (err, user) {
			if (err) return console.error(err);
				req.session.user = user;
		});
		res.redirect("/admin");
	});

});

router.post('/auth/login', function(req, res) { 
  	User.findOne({email:req.body.email},function (err, user) {
		if(err) return res.redirect('/auth');
		if(user == null) return res.render("auth", { title: 'auth',incorrectpass: false,
													 notfound: true, emailtaken: false});
		if(user.password != req.body.password) return res.render("auth", { title: 'auth',incorrectpass: true,
																		 notfound: false, emailtaken: false});
  		if(user != null && user.password == req.body.password){
  			req.session.user = user;
  			return res.redirect("/admin");
		}

	});
});

router.get('/logout', function(req, res) {
	req.session.reset();
	res.redirect('/');
});

router.get('/:page',cors(), function(req, res) {
	if(req.user) value = true;
	else value = false;
	pagesModel.findOne({url:req.params.page.trim()}, function(err,page){
		if(err) return res.send(err);
		if(page){
			if(!page.visable)return res.send("Page is currently not on display")
			res.render('newpagetemplate', { title: page.title, content: page.content,useremail:page.useremail, id:page._id,url: req.params.page.trim() ,admin: value});
		}
		else{
			res.send("404 error, Page not Found");
		}
	});
});








module.exports = router;
