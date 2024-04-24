const User = require('../models/user_model');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
