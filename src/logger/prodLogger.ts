import winston, { format, } from 'winston'
import { customeTrasport } from './customTrasport'



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
      new customeTrasport({
        level: 'info',
        format: format.json()
      })
    ]
  
  })
}




