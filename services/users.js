const db = require("../db/models");
const ErrorHandler = require("../utils/errorHandler");
const { generateAccessToken } = require("../utils/generateAccessToken");
const SuccessHandler = require("../utils/successHandler");

const { User } = db;


const errorResponse = (code, status, message, res) => {
  const instance = new ErrorHandler(status, message);
  return res.status(code).json(instance.response());
}

class UserService {
  static async create(body, res) {
    try {
      const existingUser = await User.findOne({ where: { email_address: body.email_address } })
      if (existingUser) return errorResponse(409, "Conflict", "User already exist", res);
      const user = await User.create(body);

      const successInstance = new SuccessHandler(
        "Created",
        "Registration successful",
        user
      );
      return res.status(201).json(successInstance.response());
    } catch (error) {
      return errorResponse(500, "Server Error", error.message, res);
    }
  }

  static async login({ email_address, password }, res) {
    try {
      const user = await User.findOne({ where: { email_address } });
      if (!user)
        return errorResponse(404, "Not found", "User does not exist", res);
      const passwordIsValid = user.comparePassword(password);
      if (!passwordIsValid)
        return errorResponse(
          400,
          "Bad request",
          "Email or Password is incorrect",
          res
        );
      const token = generateAccessToken(user);

      const successInstance = new SuccessHandler("Ok", "Login successful", {
        user,
        token,
      });
      return res.status(200).json(successInstance.response());
    } catch (error) {
      return errorResponse(500, "Server Error", error.message, res);
    }
  }
}

module.exports = UserService;
