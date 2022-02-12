var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var subcategoriesRouter = require('./routes/subcategories');
var adminRouter = require('./routes/admin');
var accessoriesRouter = require('./routes/accessories');
var addgameRouter = require('./routes/addgame');
var multiplepictureRouter = require('./routes/multiplegamespic');
var termsandconditionsRouter = require('./routes/termsandconditions');
var documentationRouter = require('./routes/documentation');
var subcategorypicturesRouter = require('./routes/subcategorypictures');
var userloginRouter = require('./routes/userlogin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoryRouter);
app.use('/subcategory', subcategoriesRouter);
app.use('/admin', adminRouter);
app.use('/accessories', accessoriesRouter);
app.use('/addgame', addgameRouter);
app.use('/multiplegamespic', multiplepictureRouter);
app.use('/termsandconditions', termsandconditionsRouter);
app.use('/documentation',documentationRouter);
app.use('/subcategorypicture',subcategorypicturesRouter);
app.use('/userlogin',userloginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
