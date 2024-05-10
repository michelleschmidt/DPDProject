const roleCheck = (role) => {
  return (req, res, next) => {
    console.log(req.user, role);

    if (!req.user.userId || !role.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action!" });
    }
    next();
  };
};

module.exports = {
  roleCheck,
};
