const jwt = require("jsonwebtoken");
const UserService = require("../services/userService");

function isLoggedIn(req, res, next) {
  //get the token from the request
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({ error: "No token found. You need to login" });

  //verify the token
  jwt.verify(token, process.env.SECRETE, async (error, user) => {
    if (error) return res.status(403).json({ error: error.message });


    const verifyUser = await UserService.findOne({
      where: {
        id: user.userId,
      },
    });
    req.user = user;
    next();
  });
}

module.exports = {
    isLoggedIn,
};