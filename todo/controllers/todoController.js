var bodyParser = require('body-parser');
var mongoose = require('mongoose');


///connect to the database
mongoose.connect("mongodb://test:test@ds147777.mlab.com:47777/nodetodo");

//create a schema - this is like a blue print
var todoSchema = new mongoose.Schema({
    item:String
});

var Todo = mongoose.model('Todo',todoSchema);

//data item

var urlencodedParser = bodyParser.urlencoded({extended:false});
module.exports = function(app){
    app.get('/todo',function(req,res){
        //get data from mongo db and pass it to view
        Todo.find({},function(err,data){
            if(err)throw err;
            res.render('todo',{todos:data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
      //get data from view and add it to mongo db
        var newTodo = Todo(req.body).save(function(err,data){
            if(err)throw err;
            res.json(newTodo);
        });
    });

    app.delete('/todo/:item',function(req,res){
        //delete the requested item from mongo db
        console.log(req.params.item);
        Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(
            function(err,data){
                if(err)throw err;
                res.json(data)
            }
        );
    });

};