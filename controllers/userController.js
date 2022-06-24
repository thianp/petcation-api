const { User } = require("../models");
const createError = require("../utils/createError.js");

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      createError(404, "User not found");
    }
    console.log(user);
    res.status(200).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};
