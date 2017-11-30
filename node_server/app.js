var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 5000;
var cors = require('cors');
var url = 'mongodb://CryptWalk:W4lkthatiscrypt@ds125016.mlab.com:25016/cryptwalk';

mongoose.Promise = require('bluebird');
mongoose.connect(url)
  .then(() => {
    console.log('Start');
  })
  .catch(err => {
    console.log('App starting error:', err.stack);
    process.exit(1);
  })

var UserRouter = require('./src/routes/UserRouter');

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/userInfos', UserRouter);

app.listen(port, function(){
  console.log('Server is running on port ' + port);
})
