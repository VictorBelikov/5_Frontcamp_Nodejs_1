const express = require('express');
const morgan = require('morgan');
const logger = require('./api/middleware/logger');
const globaErrHandler = require('./api/middleware/errorHandler');

const newsRoutes = require('./api/routes/news');

const app = express();

// Logs request params to the console, then always calls next().
app.use(morgan('dev'));
// Or we can use our custom logger.
// app.use(logger);

// We can use req.body... & etc.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/news', newsRoutes);

// Will reach this line only if no one of the routes is processed.
app.use((req, res, next) => {
  console.log('!! In the error callback !!');
  const err = new Error('Not found');
  err.status = 404;
  next(err); // throw error to the next middleware below
});

// Will catch all errors in the app.
app.use(globaErrHandler);

module.exports = app;
