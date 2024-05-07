const jwt = require("jsonwebtoken");
const userService = require("../services/userService");

function isLoggedIn(req, res, next) {
  //get the token from the request
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "No token found. You need to login" });

  //verify the token
  jwt.verify(token, process.env.SECRETE, async (error, user) => {
    if (error) return res.status(403).json({ error: error.message });

    // double checking for user restriction
    const service = new userService();
    const verifyUser = await service.findOne({
      where: {
        id: user.user_id,
      },
    });
    req.user = user;
    next();
  });
}

module.exports = {
    isLoggedIn,
};