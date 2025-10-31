const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createThread);
router.put("/:threadId", authMiddleware, updateThread);
router.delete("/:threadId", authMiddleware, deleteThread);

router.post("/:threadId/comments", authMiddleware, addComment);
