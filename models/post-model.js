const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "A post can only be created by user"],
    },
    caption: {
      type: String,
    },
    image: {
      type: String,
    },
    usersLiked: [{ type: mongoose.Schema.ObjectId, ref: "users" }],
    likes: {
      type: Number,
      default: 0,
      min: [0, "There can not be negetive number of likes"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});
postSchema.post("save", async function () {
  // await this.constructor.calculateLikes(this["_id"]);
});
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  })
    .populate({
      path: "comments",
      select: "user text",
    })
    .populate({
      path: "usersLiked",
      select: "name",
    });
  this.sort("-createdAt");
  next();
});
const Post = new mongoose.model("Post", postSchema);
module.exports = Post;
