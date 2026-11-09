const User = require("../models/User");
const Notification = require("../models/Notification");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      password,
      address,
      role,
    } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: normalizedEmail,
      phone,
      password: hashedPassword,
      address: address || "",
      role: role || "USER",
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error.message);

    return res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({
      email: normalizedEmail,
    });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    if (user.isActive === false) {
      return res.status(403).json({
        message: "Your account is inactive",
      });
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT_SECRET is missing in .env",
      });
    }
    const userRole = String(user.role)
      .toLowerCase()
      .trim();
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName || user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: userRole,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Profile Error:", error.message);

    return res.status(500).json({
      message: "Failed to fetch profile",
    });
  }
};
const updateUserProfile = async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (fullName !== undefined) {
      user.fullName = fullName;
    }
    if (phone !== undefined) {
      user.phone = phone;
    }
    if (address !== undefined) {
      user.address = address;
    }
    await user.save();
    const updatedUser = await User.findById(user._id).select(
      "-password"
    );
    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error.message);
    return res.status(500).json({
      message: "Profile update failed",
    });
  }
};
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });
    return res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    console.error("Get Notifications Error:", error.message);
    return res.status(500).json({
      message: "Failed to fetch notifications",
      error: error.message,
    });
  }
};
const markAllNotificationsAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      {
        user: req.user.userId,
        read: false,
      },
      {
        $set: {
          read: true,
        },
      }
    );
    return res.status(200).json({
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("Mark Notifications Error:", error.message);

    return res.status(500).json({
      message: "Failed to mark notifications as read",
      error: error.message,
    });
  }
};
module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getNotifications,
  markAllNotificationsAsRead,
};