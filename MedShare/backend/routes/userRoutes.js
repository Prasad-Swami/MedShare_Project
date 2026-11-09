const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getNotifications,
  markAllNotificationsAsRead,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get("/notifications", authMiddleware, getNotifications);
router.put(
  "/notifications/mark-all-read",
  authMiddleware,
  markAllNotificationsAsRead
);
module.exports = router;