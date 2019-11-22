const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const newsRoutes = require('./api/routes/news');

const app = express();

// Logs request params to the console, then always calls next().
app.use(morgan('dev'));

// We can use req.body... & etc.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/products', newsRoutes);

// Will reach this line only if no one of the routes is processed.
app.use((req, res, next) => {
  console.log('!! In the error callback !!');
  const err = new Error('Not found');
  err.status = 404;
  next(err); // throw error to the next middleware below
});

// Will catch all errors in the app.
app.use((err, req, res, next) => {
  console.log('!! In the error processing callback !!');
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

module.exports = app;
