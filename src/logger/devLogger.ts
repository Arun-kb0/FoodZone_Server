import winston, { format, LogEntry } from 'winston'
import { customeTrasport } from './customTrasport'


const logFormat = format.printf(({ level, message, timestamp , stack }) => {
  return `${timestamp} ${level} ${stack || message }`
})


export const devLogger = () => {

  return winston.createLogger({
    level: 'info',
    // format: format.combine(
      // format.colorize(),
    //   format.timestamp({ format: 'YYYY-MM-DD HH-mm-ss' }),
    //   format.errors({ stack: true }),
    //   logFormat,
    // ),
    defaultMeta: { service: 'user-service' },
    transports: [
      new customeTrasport({
        level: 'info',
        format: format.json()
      })

    ]
  })
}





