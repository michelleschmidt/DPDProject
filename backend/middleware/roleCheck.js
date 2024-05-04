const userService = require("../services/userService");

const roleCheck = (role) => {
  return (req, res, next) => {
    if (!req.user || !role.include(req.user.role)) {
      res.status(403).json({ message: "You are not authorized!" });
    }
    next();
  };
};

module.exports = {
  roleCheck,
};
