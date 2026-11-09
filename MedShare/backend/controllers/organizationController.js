const Medicine = require("../models/Medicine");
const MedicineRequest = require("../models/MedicineRequest");
const getOrganizationDashboard = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    const totalRequests = await MedicineRequest.countDocuments({
      organization: req.user.userId,
    });

    return res.status(200).json({
      message: "Organization dashboard fetched successfully",
      totalMedicines: medicines.length,
      totalRequests,
      medicines,
    });
  } catch (error) {
    console.error("Dashboard Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch dashboard",
      error: error.message,
    });
  }
};
const requestMedicine = async (req, res) => {
  try {
    const { medicineName, quantity } = req.body;

    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication required",
      });
    }

    if (!medicineName || typeof medicineName !== "string") {
      return res.status(400).json({
        message: "Medicine name is required",
      });
    }

    const parsedQuantity = Number(quantity);

    if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1) {
      return res.status(400).json({
        message: "Quantity must be a positive integer",
      });
    }

    const medicineRequest = await MedicineRequest.create({
      organization: req.user.userId,
      medicine: medicineName.trim(),
      quantity: parsedQuantity,
      status: "pending",
    });

    return res.status(201).json({
      message: "Medicine request submitted successfully",
      request: medicineRequest,
    });
  } catch (error) {
    console.error("Request Medicine Error:", error.message);

    return res.status(500).json({
      message: "Failed to submit medicine request",
      error: error.message,
    });
  }
};
const getMyRequests = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({
        message: "User authentication required",
      });
    }

    const requests = await MedicineRequest.find({
      organization: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My requests fetched successfully",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("My Requests Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
};

module.exports = {
  getOrganizationDashboard,
  requestMedicine,
  getMyRequests,
};
