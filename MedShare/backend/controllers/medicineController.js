const Medicine = require("../models/Medicine");
const MedicineRequest = require("../models/MedicineRequest");
const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();

    return res.status(200).json({
      message: "Medicines fetched successfully",
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("GET MEDICINES ERROR:", error.message);

    return res.status(500).json({
      message: "Error fetching medicines",
      error: error.message,
    });
  }
};

const getMedicinesByCategory = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      category: req.params.category,
    });

    return res.status(200).json({
      message: "Category medicines fetched successfully",
      count: medicines.length,
      medicines,
    });
  } catch (error) {
    console.error("CATEGORY ERROR:", error.message);

    return res.status(500).json({
      message: "Error fetching category medicines",
      error: error.message,
    });
  }
};
const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);

    if (!medicine) {
      return res.status(404).json({
        message: "Medicine not found",
      });
    }

    return res.status(200).json({
      message: "Medicine fetched successfully",
      medicine,
    });
  } catch (error) {
    console.error("MEDICINE ID ERROR:", error.message);

    return res.status(500).json({
      message: "Error fetching medicine",
      error: error.message,
    });
  }
};
const requestMedicine = async (req, res) => {
  try {
    const {
      medicineName,
      quantity,
      urgency,
      reason,
    } = req.body;
    if (
      !medicineName ||
      quantity === undefined ||
      quantity === null ||
      !urgency ||
      !reason
    ) {
      return res.status(400).json({
        message:
          "Medicine name, quantity, urgency and reason are required.",
      });
    }
    if (
      typeof medicineName !== "string" ||
      !medicineName.trim()
    ) {
      return res.status(400).json({
        message: "Medicine name is required.",
      });
    }
    if (
      !Number.isInteger(Number(quantity)) ||
      Number(quantity) < 1
    ) {
      return res.status(400).json({
        message: "Quantity must be a positive whole number.",
      });
    }
    const allowedUrgencies = [
      "Low",
      "Normal",
      "High",
      "Urgent",
    ];

    if (!allowedUrgencies.includes(urgency)) {
      return res.status(400).json({
        message:
          "Urgency must be Low, Normal, High or Urgent.",
      });
    }
    if (
      typeof reason !== "string" ||
      !reason.trim()
    ) {
      return res.status(400).json({
        message: "Reason is required.",
      });
    }
    const requesterId = req.user?.userId;
    const requesterRole = req.user?.role
      ?.toLowerCase()
      .trim();

    if (!requesterId || !requesterRole) {
      return res.status(401).json({
        message: "Authentication required.",
      });
    }
    if (
      !["user", "organization"].includes(requesterRole)
    ) {
      return res.status(403).json({
        message:
          "Only users and organizations can request medicines.",
      });
    }
    const medicineRequest = await MedicineRequest.create({
      requesterId,
      requesterRole,
      medicineName: medicineName.trim(),
      quantity: Number(quantity),
      urgency,
      reason: reason.trim(),
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Medicine request submitted successfully.",
      medicineRequest,
    });
  } catch (error) {
    console.error("REQUEST MEDICINE ERROR:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to request medicine.",
      error: error.message,
    });
  }
};
const getMyMedicineRequests = async (req, res) => {
  try {
    const requesterId = req.user?.userId;

    if (!requesterId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const requests = await MedicineRequest.find({
      requesterId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Medicine requests fetched successfully.",
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error(
      "GET MY MEDICINE REQUESTS ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch your requests.",
      error: error.message,
    });
  }
};

module.exports = {
  getAllMedicines,
  getMedicinesByCategory,
  getMedicineById,
  requestMedicine,
  getMyMedicineRequests,
};
