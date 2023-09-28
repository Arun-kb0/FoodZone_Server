import { Logger } from 'winston'
import fs, { promises as fsPromises } from 'fs'
import { join } from "path"
import { prodLogger } from './prodLogger'
import { devLogger } from './devLogger'

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