const mongoose = require("mongoose");
const commentScema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "A comment should be posted by a user"],
  },
  text: {
    type: String,
    required: [true, "A comment should have text"],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: "Post",
    required: [true, "A comment must belong to a post"],
  },
});
// populate before finding
commentScema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  });
  next();
});
const Comment = new mongoose.model("Comment", commentScema);
module.exports = Comment;
