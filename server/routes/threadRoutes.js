const authMiddleware = require("../middleware/authMiddleware");

// Protect creation, update, delete
router.post("/", authMiddleware, createThread);
router.put("/:threadId", authMiddleware, updateThread);
router.delete("/:threadId", authMiddleware, deleteThread);

// Optional: Protect comment creation
router.post("/:threadId/comments", authMiddleware, addComment);
