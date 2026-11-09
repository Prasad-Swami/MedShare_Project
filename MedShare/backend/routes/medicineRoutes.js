const express = require("express");
const router = express.Router();
const {
  getAllMedicines,
  getMedicinesByCategory,
  getMedicineById,
  requestMedicine,
  getMyMedicineRequests,
} = require("../controllers/medicineController");

const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authMiddleware");
router.post(
  "/request",
  authMiddleware,
  authorizeRole("user", "organization"),
  requestMedicine
);
router.get(
  "/my-requests",
  authMiddleware,
  authorizeRole("user", "organization"),
  getMyMedicineRequests
);
router.get(
  "/",
  authMiddleware,
  authorizeRole("organization"),
  getAllMedicines
);
router.get(
  "/category/:category",
  authMiddleware,
  authorizeRole("organization"),
  getMedicinesByCategory
);
router.get(
  "/:id",
  authMiddleware,
  authorizeRole("organization"),
  getMedicineById
);

module.exports = router;
