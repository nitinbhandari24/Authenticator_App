const express = require('express')
var app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/testForAuth')
var db = mongoose.connection

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(__dirname + '/views'))

var routes = require('./routes/router')
app.use('/', routes)


app.listen(port, function () {
  console.log(`Server is up on port ${port}`);
});
