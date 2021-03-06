var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://self_review:1234567890@cluster0-zgu3c.mongodb.net/test')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var apiRouter = require('./routes/book');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/search', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/pool-details/:id', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/pool-details/:id/review', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/guest/signin', express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/host/dashboard', express.static(path.join(__dirname, 'dist/mean-angular6')));

app.use('/api', apiRouter);

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
  res.status(err.status || 500);
  res.send(err.status);
});
app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${3000}!`))
module.exports = app;
