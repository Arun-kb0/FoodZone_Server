import winston, { format } from 'winston'
import { customTransport } from './customTransport'


const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level} ${stack || message} `
})


export const devLogger = () => {

  return winston.createLogger({
    level: 'info',
    defaultMeta: { service: 'user-service' },

    transports: [

      new customTransport({
        level: 'info',
        format: format.json()
      }),

      new winston.transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH-mm-ss' }),
          format.errors({ stack: true }),
          format.printf(({ level, message, timestamp, stack }) => {
            return `${timestamp} ${level} ${stack || message} `
          })
        ),
      })

    ]

  })

  
}





