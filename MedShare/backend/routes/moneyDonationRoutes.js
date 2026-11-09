
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createMoneyDonationOrder,
  verifyMoneyDonationPayment,
  getMyMoneyDonations,
} = require("../controllers/moneyDonationController");
router.post(
  "/create-order",
  authMiddleware,
  createMoneyDonationOrder
);
router.post(
  "/verify-payment",
  authMiddleware,
  verifyMoneyDonationPayment
);
router.get(
  "/my",
  authMiddleware,
  getMyMoneyDonations
);

module.exports = router;
