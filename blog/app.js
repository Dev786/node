//getting express
var express = require('express');
var app = express();

//set view engine
app.set('view engine','ejs');

//setting up static files
app.use(express.static('./public'));

//set the blog controller
var blogController = require('./controllers/blogController');
blogController(app);

//fire the app to listen to port 3000
app.listen(3000);
console.log("listening to port 3000");