
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const userRoutes = require("./routes/userRoutes");
const donationRoutes = require("./routes/donationRoutes");
const moneyDonationRoutes = require("./routes/moneyDonationRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/money-donations", moneyDonationRoutes);
app.use("/api/medicines", medicineRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "MedShare Backend is Running Successfully",
  });
});

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
  }
};

startServer();
