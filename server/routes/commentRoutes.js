const express = require("express");
const router = express.Router();
const { addComment, getCommentsByThread } = require("../controller/commentController");

router.post("/:threadId/comments", addComment);

router.get("/:threadId/comments", getCommentsByThread);

module.exports = router;
