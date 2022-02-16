class ErrorHandler extends Error {
  constructor (status = 'Bad Request', message, data = []) {
    super(message)
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name
    this.status = status
    this.data = data
  }

  response() {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}

module.exports = ErrorHandler