const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const catchAsync = require("../../src/utils/catchAsync");
const AppError = require("../../src/utils/appError");
const postController = require("../../src/controller/postController");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address,
        zip: req.body.zip,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log("req", req);
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ errorMessage: "Email not found, please register" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        // Sign token
        jwt.sign(
          payload,
          process.env.PASSWORD,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };
            // console.log(token);
            res.cookie("jwt", token, cookieOptions);
            res.status(200).json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ errorMessage: "Password incorrect" });
      }
    });
  });
});
// Delete Cookie
router.get("/logout", (req, res, next) => {
  res.cookie("jwt", "loggedOUT", {
    expiresIn: Date.now() + 1000 * 1,
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
    message: "loggedOut",
  });
});
router.get(
  "/postsLiked",
  postController.protect,
  catchAsync(async (req, res, next) => {
    const posts = await User.findOne({
      _id: req.user.id,
    })
      .select("postsLiked")
      .populate({ path: "postsLiked", select: "_id" });
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  })
);
router.get(
  "/post",
  postController.protect,
  catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user.id).populate("posts");
    const posts = user.posts;
    res.status(200).json({
      status: "success",
      data: {
        posts,
      },
    });
  })
);
module.exports = router;
