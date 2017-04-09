var bodyParser = require('body-parser');
var urlEncoded = bodyParser.urlencoded({extended:false});
var mongoose = require('mongoose');


mongoose.connect("mongodb://blog:blog@ds153400.mlab.com:53400/blog");

var blogSchema = new mongoose.Schema({
    title:String,
    content:String,
    likes:{type:Number,default:0}
});

var Blog = mongoose.model('Blog',blogSchema);

module.exports = function(app){

    app.get('/',function(req,res){
        Blog.find({},function(err,data){
            if(err) throw err;
            res.render('mainPage',{data:data});
        });
    });   

    app.get('/blogContent/:title',function(req,res){
        console.log(req.params.title.replace(/\-/g," "));
        Blog.findOne({'title':req.params.title.replace(/\-/g," ")},function(err,data){
            console.log(data);
            if(err) throw err;
            res.render('blogContent',{data:data});
        });     
    });
      

    app.post('/addData',urlEncoded,function(req,res){
        var username = req.body.username;
        var password = req.body.password;
        console.log(username+" "+password);
        if(username=="dev" && password=="devrock131"){
            res.render('addData');
        }else{
            res.render('404');
        }

    });

    app.post('/addData_Data_added',urlEncoded,function(req,res){
        var item = {title: req.body.name,content : req.body.content};
        var newBlog = Blog(item).save(function(err,data){
            if(err) throw err;
            console.log(data);
            res.redirect('/');
        });
    });
    
}   