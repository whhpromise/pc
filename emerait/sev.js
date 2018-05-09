var express= require("express");
var mongo = require("mongodb");
var app = express()

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});


app.get('/d',function(req,res){ 
    // var random = function (min, max) {
    //     return Math.floor(Math.random() * (max - min) + min)
    // }
    // var lastStr = ""
    // var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    // for (var i = 0; i < 4; i++) {
    //     var code = str[random(0, str.length)]
    //     lastStr += code
    // }
    res.send(1);   
    })  
app.listen(3000,function(){
    console.log("走你...")
})
     