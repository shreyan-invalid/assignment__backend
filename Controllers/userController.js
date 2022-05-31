const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { validatePassword, hashPassword } = require("../Utils/userUtils");

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({ email });
    if (user) return next(new Error("Email already exists"));
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
      name: name,
      role: "user",
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();
    res.json({
      data: newUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return next(new Error("Email does not exist"));
      const validPassword = await validatePassword(password, user.password);
      if (!validPassword) return next(new Error("Password is not correct"));
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      await User.findByIdAndUpdate(user._id, { accessToken });
      req.user= user;
      res.locals.loggedInUser= user;
      res.status(200).json({
        data: {
          email: user.email,
          role: user.role,
          name: user.name,
          id: user._id,
        },
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) return next(new Error("User does not exist"));
    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const update = req.body;
    const userId = req.params.userId;
    await User.findByIdAndUpdate(userId, update);
    const user = await User.findById(userId);
    res.status(200).json({
      data: user,
      message: "User has been updated",
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      data: null,
      message: "User has been deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  deleteUser,
  getUsers,
};
