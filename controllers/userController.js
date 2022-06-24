const { User } = require("../models/User");

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    res.json({ user });
  } catch (err) {
    console.log(err);
  }
};
