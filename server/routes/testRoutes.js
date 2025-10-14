const express = require("express");
const protect = require("../middleware/authMiddleware"); // make sure path is correct

const router = express.Router();

// Protected route
router.get("/protected", protect, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

module.exports = router;
