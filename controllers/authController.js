const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createError = require("../utils/createError");
const { User } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });


exports.register = async (req, res, next) => {
  try {
    const { uId,email, password, confirmPassword } = req.body;
console.log(email)
    if (!uId) {
      createError("uId is required", 400);
    }

    if (!password) {
      createError("password is required", 400);
    }
    if (password !== confirmPassword) {
      createError("password did not match", 400);
    }

    const checkUId = await User.findOne({
      where: { uId },
    });

    if (checkUId?.uId === uId) {
      createError("uId already exists", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      uId,
      email,
      password: hashedPassword,
    });

    const token = genToken({ id: user.id });

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { uId, password } = req.body;
    const user = await User.findOne({ where: { uId } });
    console.log(user);
    if (!user) {
      createError("invalid credential", 400);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      createError("invalid credential", 400);
    }
    const token = genToken({ id: user.id });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    const { googleData } = req.body;
    const payload = jwt.decode(googleData);
    const existingUser = await User.findOne({
      where: { uId: payload.sub },
    });
    if (!existingUser) {
      await User.create({
        firstName: payload.given_name,
        lastName: payload.family_name,
        email: payload.email,
        userPic: payload.picture,
        uId: payload.sub,
      });
    }
    const user = await User.findOne({
      where: { uId: payload.sub },
    });
    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
