/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var bodyParser = require('body-parser');

var app = express();

// post受け取り用
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

// dynamodb 接続用
var dynamodbConfig = require('./config/dynamodb');
var dynamoose = require('dynamoose');

dynamoose.local();
dynamoose.AWS.config.update(dynamodbConfig);

// router 
require('./routes').default(app);

module.exports = app
