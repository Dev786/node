var express= require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');

//app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');
//app.use(urlencodedParser);
//app.use(bodyParser.json);
app.get('/',function(req,res){
  res.render('index.ejs');
});

app.use('/assets',express.static('assets'));

app.post('/contact',function(req,res){
  console.log(req.body);
  res.render('contact',{qs:req.body});
});

app.get('/profile/:id',function(req,res){
  var data = {
    age:29,
    job:'ninja',
    hobbies:['eating','fighting','fishing']
  }
 res.render('profile',{person:req.params.id,data:data});
});



app.listen(3000);
