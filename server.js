const express = require('express');
const favicon = require('express-favicon');
const serveStatic = require('serve-static');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const config = require('./config');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(compression());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(serveStatic(config.PATH.public, {
  lastModified: true,
  etag: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: setCustomCacheControl
}));

app.use((req, res, next) =>{
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) =>{
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {}
  });
});

function setCustomCacheControl (res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}

module.exports = app;
