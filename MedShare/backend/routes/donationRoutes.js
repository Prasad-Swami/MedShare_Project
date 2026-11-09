const express = require("express");
const router = express.Router();
const {
  createDonation,
  getMyDonations,
} = require("../controllers/donationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDonation);
router.get("/my", authMiddleware, getMyDonations);

module.exports = router;
