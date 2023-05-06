const User = require("../models/user");
const ErrorResponse = require("../utils/errorResponse");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({
      success: false,
      message: "E-mail Already Exists",
    });
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      // return next(new ErrorResponse('E-mail and password are required', 400))
      return res.status(400).json({
        success: false,
        message: "E-mail and password are required",
      });
    }

    //check user e-mail
    const user = await User.findOne({ email });
    if (!user) {
      // return next(new ErrorResponse('Invalid credentials', 400))
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    //verify user password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return res.status(400).json({
        success: false,
        message: "Inavlid credentials",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    next(new ErrorResponse("Cannot log in, check your credentials", 400));
  }
};
