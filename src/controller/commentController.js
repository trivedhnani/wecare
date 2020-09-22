const Comment = require("../../models/comment-model");
// const User = require("../../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
// Add comment
exports.createComment = catchAsync(async (req, res, next) => {
  if (!req.body.post && !req.params.id)
    return next(new AppError(400, "Please provide post id"));
  if (!req.body.post) {
    req.body.post = req.params.id;
  }
  req.body.user = req.user.id;
  // console.log(req.body);
  const comment = await Comment.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
// Get All comments
exports.getAllComments = catchAsync(async (req, res, next) => {
  let id = {};
  if (req.params.id) {
    id = { post: req.params.id };
  }
  const comments = await Comment.find(id);
  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});

// Get Comments by Id
exports.getCommentById = catchAsync(async (req, res, next) => {
  const comments = await Comment.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      comments,
    },
  });
});
// Update comment by id
exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      comment,
    },
  });
});
// Delete comment by id
exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
