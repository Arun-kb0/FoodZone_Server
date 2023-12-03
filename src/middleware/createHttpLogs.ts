import { Request, Response, NextFunction } from "express"
import logger, { formatHTTPLoggerResponse }  from "../logger/loggerIndex"
import { CustomError } from "../util/customeError"
import { httpStatus } from "../constants/httpStatus"



export const httpLogger = (req: Request, res: Response, next: NextFunction, message?: string) => {
  console.log(res)
  logger.log(
    'info',
    message? message : '',
    {
      logData:formatHTTPLoggerResponse(req, res),
      filename: 'httpLogs.log',
    }
  )
  next()
}



const formatedErrorLog = (error: CustomError, req: Request, res: Response) => {
  return {
    errorName: error.name,
    errorMessage: error.message,
    errorStack: error.stack,
    request: {
      method: req.method,
      url: req.url,
      origin: req.headers.origin,
      host: req.headers.host,
      clentIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    response: {
      header: res.getHeaders(),
      statuscode: res.statusCode,
    }
  }
}


export const globalErrorHandler = (error: CustomError, req: Request, res: Response, next: NextFunction)=>{
  
  if (error.name === 'TokenExpiredError') {
    error.statusCode = httpStatus.UNAUTHORIZED
  }

  error.statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR 
  res.status(error.statusCode).json({
    status: error.status,
    name:error.name,
    message: error.message
  })

  logger.log(
    'info',
    error.message,
    {
      logData: formatedErrorLog(error,req,res),
      filename: 'ErrorLogs.log',
    }
  )

}





