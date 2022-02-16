const ErrorHandler = require("../utils/errorHandler");
const SuccessHandler = require("../utils/successHandler");
const UserService = require("../services/users");
const { catchAsync } = require("../utils/asyncHandler");
const {
  registerUserValidator,
  loginUserValidator,
} = require("../utils/validator");

class UserController {
  static signUp = catchAsync(async (req, res) => {
    const {
      first_name,
      last_name,
      email_address,
      phone_number,
      password,
      confirm_password,
    } = req.body;
    const { error } = registerUserValidator({
      first_name,
      last_name,
      email_address,
      phone_number: phone_number ? phone_number.toString() : "",
      password,
      confirm_password,
    });
    if (error) {
      const errorInstance = new ErrorHandler(
        "Forbidden",
        "Invalid credentials",
        error.details
      );
      return res.status(403).json(errorInstance.response());
    }
    await UserService.create(
      {
        first_name,
        last_name,
        email_address,
        phone_number: phone_number ? phone_number.toString() : "",
        password,
      },
      res
    );
  });

  static login = catchAsync(async (req, res) => {
    const { error } = loginUserValidator(req.body);
    if (error) {
      const errorInstance = new ErrorHandler(
        "Forbidden",
        "Invalid credentials",
        error.details
      );
      return res.status(403).json(errorInstance.response());
    }
    await UserService.login(req.body, res);
  });
}

module.exports = UserController;
