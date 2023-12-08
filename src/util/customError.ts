
export class CustomError extends Error {
  isOperational: boolean
  status: string

  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message)
    this.statusCode = statusCode
    this.status = (statusCode >= 400 && statusCode <= 500) ? 'fail' : 'error'

    this.isOperational = true
    Error.captureStackTrace(this, this.constructor)
  }


}


