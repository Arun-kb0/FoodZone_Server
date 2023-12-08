import winston, { format, } from 'winston'
import { customTransport } from './customTransport'



export const prodLogger = () => {
  return winston.createLogger({
    level: 'http',
    format: format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json(),
    ),
    
    defaultMeta: { service: 'user-service' },
    transports: [
      new customTransport({
        level: 'info',
        format: format.json()
      })
    ]
  
  })
}




