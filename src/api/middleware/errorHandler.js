const globaErrHandler = (err, req, res, next) => {
  console.log('!! In the global err handler !!:\n', err);
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
};

module.exports = globaErrHandler;
