const express = require("express");
const router = express.Router();
const {
  getAdminDashboard,
  getAllRequests,
  updateRequestStatus,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
router.get(
  "/dashboard",
  authMiddleware,
  authMiddleware.authorizeRole("admin"),
  getAdminDashboard
);
router.get(
  "/requests",
  authMiddleware,
  authMiddleware.authorizeRole("admin"),
  getAllRequests
);
router.put(
  "/requests/:id/status",
  authMiddleware,
  authMiddleware.authorizeRole("admin"),
  updateRequestStatus
);

module.exports = router;