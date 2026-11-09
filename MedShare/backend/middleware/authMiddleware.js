const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided",
      });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId || !decoded.role) {
      return res.status(401).json({
        message: "Invalid token payload",
      });
    }
    req.user = {
      userId: decoded.userId,
      role: decoded.role.toLowerCase().trim(),
    };
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message)
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }
    const userRole = req.user.role.toLowerCase().trim();
    const allowedRoles = roles.map((role) =>
      role.toLowerCase().trim()
    );
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission.",
      });
    }
    next();
  };
};
const organizationOnly = authorizeRole("organization");
module.exports = authMiddleware;
module.exports.protect = authMiddleware;
module.exports.authorizeRole = authorizeRole;
module.exports.organizationOnly = organizationOnly;