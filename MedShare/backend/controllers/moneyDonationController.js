const Razorpay = require("razorpay");
const crypto = require("crypto");
const MoneyDonation = require("../models/MoneyDonation");
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createMoneyDonationOrder = async (req, res) => {
  try {
    const { amount, fundType, donorName, email } = req.body;
    if (!amount || !fundType || !donorName || !email) {
      return res.status(400).json({
        message: "Please provide amount, fund type, name and email",
      });
    }
    const donationAmount = Number(amount);

    if (!Number.isFinite(donationAmount) || donationAmount < 1) {
      return res.status(400).json({
        message: "Donation amount must be at least ₹1",
      });
    }
    if (!["GENERAL", "MEDICINE_ASSISTANCE"].includes(fundType)) {
      return res.status(400).json({
        message: "Invalid fund type",
      });
    }
    if (
      typeof donorName !== "string" ||
      donorName.trim().length === 0 ||
      typeof email !== "string" ||
      !email.includes("@")
    ) {
      return res.status(400).json({
        message: "Please provide a valid donor name and email",
      });
    }
    const order = await razorpay.orders.create({
      amount: Math.round(donationAmount * 100),
      currency: "INR",
      receipt: `medshare_${Date.now()}`,
      notes: {
        fundType,
        donorName: donorName.trim(),
        email: email.trim(),
      },
    });
    const donation = await MoneyDonation.create({
      donor: req.user.userId,
      donorName: donorName.trim(),
      email: email.trim(),
      amount: donationAmount,
      fundType,
      razorpayOrderId: order.id,
      paymentStatus: "Pending",
    });

    return res.status(201).json({
      message: "Razorpay order created successfully",
      order,
      donation,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Create Money Donation Error:", error);

    return res.status(500).json({
      message: "Failed to create Razorpay order",
      error: error.message,
    });
  }
};
const verifyMoneyDonationPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        message: "Payment verification details are missing",
      });
    }
    const donation = await MoneyDonation.findOne({
      razorpayOrderId: razorpay_order_id,
      donor: req.user.userId,
    });

    if (!donation) {
      return res.status(404).json({
        message: "Donation order not found",
      });
    }
    if (donation.paymentStatus === "Success") {
      return res.status(200).json({
        message: "Payment already verified",
        donation,
      });
    }
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const signatureBuffer = Buffer.from(
      generatedSignature,
      "hex"
    );

    const receivedSignatureBuffer = Buffer.from(
      razorpay_signature,
      "hex"
    );

    const isSignatureValid =
      signatureBuffer.length === receivedSignatureBuffer.length &&
      crypto.timingSafeEqual(
        signatureBuffer,
        receivedSignatureBuffer
      );

    if (!isSignatureValid) {
      donation.paymentStatus = "Failed";
      await donation.save();

      return res.status(400).json({
        message: "Payment signature verification failed",
      });
    }
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );
    if (
      payment.status !== "captured" ||
      payment.order_id !== razorpay_order_id ||
      payment.amount !== Math.round(donation.amount * 100)
    ) {
      donation.paymentStatus = "Failed";
      await donation.save();

      return res.status(400).json({
        message:
          "Payment is not captured or payment details do not match",
      });
    }
    donation.razorpayPaymentId = razorpay_payment_id;
    donation.paymentStatus = "Success";

    await donation.save();

    return res.status(200).json({
      message: "Payment verified successfully",
      donation,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return res.status(500).json({
      message: "Payment verification failed",
      error: error.message,
    });
  }
};
const getMyMoneyDonations = async (req, res) => {
  try {
    const donations = await MoneyDonation.find({
      donor: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Money donations fetched successfully",
      donations,
    });
  } catch (error) {
    console.error("Fetch Money Donations Error:", error);

    return res.status(500).json({
      message: "Failed to fetch money donations",
      error: error.message,
    });
  }
};
module.exports = {
  createMoneyDonationOrder,
  verifyMoneyDonationPayment,
  getMyMoneyDonations,
};