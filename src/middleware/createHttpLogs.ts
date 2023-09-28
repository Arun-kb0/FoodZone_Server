import { Request, Response, NextFunction } from "express"
import logger from "../logger/loggerIndex"



export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  logger.log(
    'info',
    `{ method: ${req.method}, url: ${req.url} , origin: ${req.headers.origin} , responseStatus:${res.statusCode } }`,
    { meta: { filename: 'requests.log' } }
  )
  next()
}


export const logHttpErrors = (error: Error, req: Request, res: Response,next:NextFunction) => {
  logger.log(
    'error',
    `{ errorName: ${error.name} ,errorMessage: ${error.message},errorStack: ${error.stack} , method: ${req.method}, url: ${req.url}, origin:${req.headers?.origin}}`,
    {meta: {filename:'httpErrors.log'}}
  )
  next()
}


