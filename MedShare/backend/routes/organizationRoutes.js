
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Organization = require("../models/Organization");
const router = express.Router();
const uploadDir = path.join(__dirname, "../uploads/organizations");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      uniqueName + path.extname(file.originalname).toLowerCase()
    );
  },
});
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG and PNG files are allowed."));
    }
  },
});
const verifyOrganization = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Login required.",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const organization = await Organization.findById(decoded.id)
      .select("-password");
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found.",
      });
    }
    req.organization = organization;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const organization = await Organization.findOne({
      email: email.toLowerCase(),
    });

    if (!organization) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }
    const isMatch = await bcrypt.compare(
      password,
      organization.password
    );
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }
    const token = jwt.sign(
      {
        id: organization._id,
        role: "organization",
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      message: "Login successful.",
      token,
      organization: {
        id: organization._id,
        organizationName: organization.organizationName,
        email: organization.email,
        verificationStatus: organization.verificationStatus,
      },
    });
  } catch (error) {
    console.error("Organization login error:", error.message);
    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});
router.post(
  "/register",
  upload.array("documents", 5),
  async (req, res) => {
    try {
      const {
        organizationName,
        registrationNumber,
        licenseDetails,
        contactPerson,
        email,
        phone,
        address,
        city,
        serviceAreas,
        password,
      } = req.body;
      if (
        !organizationName ||
        !registrationNumber ||
        !contactPerson ||
        !email ||
        !phone ||
        !password
      ) {
        return res.status(400).json({
          message: "Please fill all required fields.",
        });
      }
      const existing = await Organization.findOne({
        $or: [
          { email: email.toLowerCase() },
          { registrationNumber },
        ],
      });
      if (existing) {
        return res.status(409).json({
          message: "Email or registration number already exists.",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const organization = await Organization.create({
        organizationName,
        registrationNumber,
        licenseDetails,
        contactPerson,
        email: email.toLowerCase(),
        phone,
        address,
        city,
        serviceAreas: serviceAreas
          ? serviceAreas
              .split(",")
              .map((area) => area.trim())
              .filter(Boolean)
          : [],
        password: hashedPassword,
        verificationDocuments: (req.files || []).map(
          (file) => "uploads/organizations/" + file.filename
        ),
      });
      return res.status(201).json({
        message:
          "Organization registered successfully. Verification is pending.",
        organizationId: organization._id,
        verificationStatus: organization.verificationStatus,
      });
    } catch (error) {
      console.error(
        "Organization registration error:",
        error.message
      );
      return res.status(500).json({
        message: "Registration failed. Please try again.",
      });
    }
  }
);
router.get("/profile", verifyOrganization, (req, res) => {
  return res.status(200).json({
    message: "Profile fetched successfully.",
    organization: req.organization,
  });
});
router.get(
  "/verification-status",
  verifyOrganization,
  (req, res) => {
    return res.status(200).json({
      verificationStatus: req.organization.verificationStatus,
    });
  }
);
const requireVerifiedOrganization = (req, res, next) => {
  if (req.organization.verificationStatus !== "Verified") {
    return res.status(403).json({
      message:
        "Your organization must be verified to access this activity.",

      verificationStatus: req.organization.verificationStatus,
    });
  }

  next();
};
router.get("/admin/all", async (req, res) => {
  try {
    const organizations = await Organization.find()
      .select("-password")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      count: organizations.length,
      organizations,
    });
  } catch (error) {
    console.error("Fetch organizations error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch organizations.",
    });
  }
});
module.exports = router;
