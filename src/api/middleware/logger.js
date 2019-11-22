const logger = (req, res, next) => {
  console.log(`Logger: req.method => ${req.method} / req.url => ${req.url}`);
  next();
};

module.exports = logger;
