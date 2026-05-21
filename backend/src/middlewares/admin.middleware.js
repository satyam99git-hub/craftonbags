// Restricts selected routes to administrator users.
const adminMiddleware = (req, res, next) => {
  if (req.user?.role === "admin") {
    next();
    return;
  }

  res.status(403).json({
    success: false,
    message: "Admin access required",
  });
};

export default adminMiddleware;
