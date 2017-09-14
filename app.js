var express = require('express');
var app = express();
var path = require('path');
var sentiment = require('sentiment');
var mlsentiment = require('ml-sentiment');
//var bodyparser = require('body-parser');
//app.use(express.static(path.join(__dirname,'public')));
//app.use(bodyparser.urlencoded({extended:true}));
//app.use(bodyparser.json());
app.get('/',function(req,res){
    res.send("Hello World");
});

app.get('/testsentiment',function(req,res){
    var response = `
    <head>
    <title>Sentiment Analysis!</title>    
    <body>
        <p>Welcome to sentiment analysis</p>
        <form action="/testsentiment" method="get">
        <p>Enter text</p>
        <input type="text" name="phrase">
        <input type="submit" value="send"> 
        </form>   
    </body>
    </head>`;
    var phrase = req.query.phrase;
    if(!phrase){
        res.send(response);
    }
    else{
        sentiment(phrase,function(err,result){
            response = 'sentiment(' +phrase+ ') === ' + result.score;
            var mlsentiment = 'mlsentiment('+phrase+') === ' +result.score; 
            res.send({response,mlsentiment});
        });
    }

});

var PORT = process.env.PORT || 3000;

app.listen(PORT,function(err){
    console.log('Server is listening at port:'+PORT);
});