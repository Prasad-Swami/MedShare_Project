const Donation = require("../models/Donation");
const createDonation = async (req, res) => {
  try {
    const {
      medicineName,
      category,
      quantity,
      expiryDate,
      condition,
      description,
    } = req.body;
    if (
      !medicineName ||
      !category ||
      !quantity ||
      !expiryDate ||
      !condition
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }
    if (Number(quantity) < 1) {
      return res.status(400).json({
        message: "Quantity must be at least 1",
      });
    }
    const donation = await Donation.create({
      donor: req.user.userId,
      medicineName,
      category,
      quantity,
      expiryDate,
      condition,
      description: description || "",
    });
    return res.status(201).json({
      message: "Medicine donation submitted successfully",
      donation,
    });
  } catch (error) {
    console.error("Donation Error:", error.message);
    return res.status(500).json({
      message: "Failed to create donation",
    });
  }
};

const getMyDonations = async (req, res) => {
  try {
    const donations = await Donation.find({
      donor: req.user.userId,
    }).sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Donations fetched successfully",
      donations,
    });
  } catch (error) {
    console.error("Fetch Donations Error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch donations",
    });
  }
};

module.exports = {
  createDonation,
  getMyDonations,
};
