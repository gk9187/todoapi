/* 1. expressモジュールをロードし、インスタンス化してappに代入。*/
var express = require("express");
var app = express();

/* 2. listen()メソッドを実行して3000番ポートで待ち受け。*/
var server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

/* 3. 以後、アプリケーション固有の処理 */

// サンプルデータ
var dataList = [
    {
        id: "001",
        title: "title-1",
        content: "content-1",
        create_date: "2017-04-01",
        update_date: "2017-04-01",
        status: "done",
    },{
        id: "002",
        title: "title-2",
        content: "content-2",
        create_date: "2017-04-01",
        update_date: "2017-04-01",
        status: "done",
    }
]

// リストを取得するAPI
app.get("/list", function(req, res, next){
    res.json(dataList);
});
