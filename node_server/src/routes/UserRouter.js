var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');
var UserRouter = express.Router();
var nodemailer = require('nodemailer');


// Require UserInfo model in our routes module
var UserInfo = require('../models/UserInfo');

// Defined store route
UserRouter.route('/add/post').post(function (req, res) {
  var info = new UserInfo(req.body);
  console.log(info);
      info.save()
    .then(info => {
      //var obj = {bool: true}
      res.json('UserInfo added successfully');
      //res.json(info);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Authenticate user with ID and Password
UserRouter.route('/authenticate-password').post(function (req, res) {
  var info = req.body;
  var user = info['userID'];
  var pass = info['userPassword'];

  if(user === '') user = '123';
  UserInfo.find({ userID: user, userPassword: pass}, function (err, itms){
    if(err){
      console.log(err);
    }

    else {
      res.json(itms);
    }
  });
})

// Authenticate user with ID and Email
UserRouter.route('/authenticate-email').post(function (req, res) {
  var info = req.body;
  var user = info['userID'];
  var email = info['userEmail'];

  if(user === '') user = '123';
  UserInfo.find({ userID: user, userEmail: email}, function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
})

//Check if email exists in database
UserRouter.route('/check-email').post(function (req, res) {
  var info = req.body;
  var email = info['userEmail'];

  UserInfo.find({userEmail: email}, function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
})

//Check if username exists in database
UserRouter.route('/check-user').post(function (req, res) {
  var info = req.body;
  var user = info['userID'];

  if(user === '') user = '123';
  UserInfo.find({userID: user}, function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
})


// Retrieve password of specific UserID
UserRouter.route('/getPassword').post(function (req, res) {
  var info = req.body;
  var user = info['userID'];
  var query = {userID: user};

  UserInfo.find(query, function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
})

// Defined get data(index or listing) route
UserRouter.route('/').get(function (req, res) {
  UserInfo.find(function (err, itms){
    if(err){
      console.log(err);
    }
    else {
      res.json(itms);
    }
  });
});

module.exports = UserRouter;
