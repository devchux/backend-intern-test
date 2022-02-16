const ErrorHandler = require("./errorHandler")

exports.catchAsync = fn => (req, res) => {
  try {
    return fn(req, res)
  } catch (error) {
    const errorInstance = new ErrorHandler('Server Error', error.message)
    const response = errorInstance.response()
    return res.status(500).json(response)
  }
}