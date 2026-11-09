const mongoose = require("mongoose");
const organizationSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    licenseDetails: {
      type: String,
      default: "",
    },

    contactPerson: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    serviceAreas: {
      type: [String],
      default: [],
    },

    password: {
      type: String,
      required: true,
    },

    verificationDocuments: {
      type: [String],
      default: [],
    },

    verificationStatus: {
      type: String,
      enum: ["Pending", "Verified", "Rejected", "Suspended"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Organization",
  organizationSchema
);
