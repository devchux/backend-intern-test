class SuccessHandler {
  constructor (status = 'Ok', message, data = []) {
    this.name = this.constructor.name
    this.status = status
    this.data = data
    this.message = message
  }

  response() {
    return {
      status: this.status,
      message: this.message,
      data: this.data
    }
  }
}

module.exports = SuccessHandler