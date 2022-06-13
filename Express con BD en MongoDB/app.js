var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var brandRouter = require('./routes/brands');
const methods = require("./methods")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

//inyectarel usuario

app.use((req,res,next)=>{
  const authToken = req.cookies['AuthToken']
  req.user = methods.authTokens[authToken]
  next()
})


//se agregan las rutas del proyecto
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/brand', brandRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



/// conecion a mongo
mongoose.connect(
  'mongodb://localhost:27017/exampleDB',
  {
      useNewUrlParser:true,
      useUnifiedTopology:true
  }
  )
  .then(
      () =>
      console.log('se ha establecido la conexion'))
  .catch(e => console.log('error de conexion',e))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
