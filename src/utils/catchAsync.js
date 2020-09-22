// To deal with catch block in every async middleware
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
module.exports = catchAsync;
