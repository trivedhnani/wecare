const Post = require("../../models/post-model");
const { promisify } = require("util");
const User = require("../../models/User");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const sharp = require("sharp");

// Multer storage handles storage
// Storing in buffer so we can resize
const multerStorage = multer.memoryStorage();
// Multer filter-- allows only image types
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image please upload image"), false);
  }
};
// Configure Multer
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
exports.uploadPostPhoto = upload.single("photo");
// Resize and compress image
exports.resizePostPhoto = (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `post-${req.user["_id"]}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(500, 333)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/posts/${req.file.filename}`);
  next();
};
// Create post
exports.createPost = catchAsync(async (req, res, next) => {
  if (!req.body.image && !req.body.caption)
    return next(new AppError(400, "A caption or an image must be provided"));
  if (!req.body.user) req.body.user = req.user["_id"];
  // console.log(req.file);
  if (req.file) req.body.image = req.file.filename;
  const post = await Post.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
// Get All Posts
exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

// Get Posts by Id
exports.getPostById = catchAsync(async (req, res, next) => {
  const posts = await Post.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      posts,
    },
  });
});

// Get All Posts
exports.updatePost = catchAsync(async (req, res, next) => {
  if (req.body.image === "" && req.body.caption === "")
    return next(new AppError(400, "A caption or an image must be present !!"));
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});
// Delete Post By  id
exports.deletePost = catchAsync(async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});

// Handle Likes
exports.handleLike = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  // Since we are storing users as object id we need to convert to string to compare
  req.body.user = req.user["_id"].toString();
  const user = post.usersLiked.filter((el) => {
    return el["_id"].toString() === req.body.user;
  });
  // console.log(user);
  let usersLiked = post.usersLiked;
  let likes = post.likes;
  let liked = false;
  // If the user already liked it, remove like else add
  if (user.length === 1) {
    usersLiked = post.usersLiked.filter(
      (el) => el["_id"].toString() !== req.body.user
    );
    likes -= 1;
  } else {
    usersLiked = [...post.usersLiked, req.body.user];
    likes += 1;
    liked = true;
  }
  const updatedPost = await Post.findByIdAndUpdate(
    post["_id"],
    { usersLiked, likes },
    {
      runValidators: true,
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
    data: {
      post: updatedPost,
      liked,
    },
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // 1.Getting token and check if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(401, "You are not logged in! Please login to get access")
    );
  }
  // 2.Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // 3.check if the user still exists
  const freshuser = await User.findById(decoded.id);
  if (!freshuser) {
    return next(new AppError(401, "User belonging this token does not exist"));
  }
  // // 4.check if the user changed password after token was created
  // // console.log(freshuser);
  // if (freshuser.changedPasswordAfter(decoded.iat)) {
  //   return next(
  //     new AppError(401, 'User recently changed password. Please login again!!')
  //   );
  // }
  // Grant access to protected route
  // console.log(freshuser);
  req.user = freshuser;
  next();
});
