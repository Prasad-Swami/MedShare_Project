const User = require("../models/User");
const Medicine = require("../models/Medicine");
const MedicineRequest = require("../models/MedicineRequest");
const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalMedicines = await Medicine.countDocuments();
    const totalRequests = await MedicineRequest.countDocuments();

    const pendingRequests = await MedicineRequest.countDocuments({
      status: "pending",
    });

    return res.status(200).json({
      message: "Admin dashboard fetched successfully",
      totalUsers,
      totalMedicines,
      totalRequests,
      pendingRequests,
    });
  } catch (error) {
    console.error("Admin Dashboard Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch admin dashboard",
    });
  }
};

const getAllRequests = async (req, res) => {
  try {
    const requests = await MedicineRequest.find()
      .populate("organization", "fullName email")
      .populate("medicine");

    return res.status(200).json({
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    console.error("Get Requests Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch requests",
    });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected",
      });
    }

    const request = await MedicineRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Medicine request not found",
      });
    }

    request.status = status;
    await request.save();

    return res.status(200).json({
      message: `Request ${status} successfully`,
      request,
    });
  } catch (error) {
    console.error("Update Request Error:", error.message);

    return res.status(500).json({
      message: "Failed to update request status",
    });
  }
};

module.exports = {
  getAdminDashboard,
  getAllRequests,
  updateRequestStatus,
};
