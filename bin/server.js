'use strict';

const express = require('express');
const livereload = require('express-livereload')
const fs = require('fs');
const opener = require('opener');
const path = require('path');
const serveStatic = express.static;
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackMiddlewareConfig = require('./middleware.config.js');


const projectName = process.argv[2];


const PORT = parseInt(process.argv[3], 10) || 1507;

const exitIfError = (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};


const serve = serveStatic(webpackConfig.devServer.contentBase, {
  'index': ['index.html', 'index.htm']
});

const app = express();

livereload(app);

const compiler = webpack(webpackConfig);
const middleware = webpackMiddleware(compiler, webpackMiddlewareConfig);
app.use(middleware);

app.listen(PORT, '0.0.0.0', (err) => {
  exitIfError(err);

  const hostname = `http://localhost:${PORT}`;

  console.info(`==> 🌎 Сервер запущен на порту ${PORT}. Откройте ${hostname}  у себя в браузере. Чтобы остановить сервер, нажмите Ctrl+C`);
});
