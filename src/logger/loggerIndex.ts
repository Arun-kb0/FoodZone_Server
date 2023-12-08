import { Logger } from 'winston'
import fs, { promises as fsPromises } from 'fs'
import { join } from "path"
import { prodLogger } from './prodLogger'
import { devLogger } from './devLogger'
import { Request, Response, NextFunction } from "express"


export const formatHTTPLoggerResponse = (req: Request, res: Response, responseMessage?: string,) => {
  const formattedData = {
    request: {
      method: req.method,
      url: `${req.baseUrl}${req.url}`,
      origin: req.headers.origin,
      host: req.headers.host,
      clientIp: req?.headers['x-forwarded-for'] || req.socket.remoteAddress,
    },
    response: {
      header: res.getHeaders(),
      statuscode: res.statusCode,
      responseMessage: responseMessage,
    }
  }
  return formattedData
}



const createLogDirectory = async () => {
  const curDir = process.cwd()
  const logDir = join(curDir,'..','..','..','logs')

  if (!fs.existsSync(logDir)) {
    await fsPromises.mkdir(logDir)
  }
}

createLogDirectory()
let logger: Logger
if (process.env.NODE_ENV === 'prod') {
  logger = prodLogger()
} else {
  logger = devLogger()
}

export default logger 