const express = require("express");
const commentController = require("../src/controller/commentController");
const router = express.Router({ mergeParams: true });
router
  .route("/")
  .post(commentController.createComment)
  .get(commentController.getAllComments);
router
  .route("/:id")
  .get(commentController.getCommentById)
  .patch(commentController.updateComment)
  .delete(commentController.deleteComment);
module.exports = router;
