// Global Error handler Middleware
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";
  // console.log(err.stack);
  res.status(err.statusCode).json({
    status: "fail",
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
module.exports = errorHandler;
