import winston, { format, LogEntry, } from 'winston'
import Trasport, { TransportStreamOptions } from 'winston-transport'

const { timestamp, printf, json, combine } = format


export class customeTrasport extends Trasport {
  constructor(opts: TransportStreamOptions) {
    super(opts)
  }

  log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info)
    })
    const { level, message, logData, filename } = info

    const logger = winston.createLogger({
      format: combine(
        timestamp(),
        json(),
        printf(({ timestamp, level, message, ...data }) => {
          const response = {
            level,
            message,
            logData,
            timestamp
          }
          return JSON.stringify(response)
        })
      ),
      transports: [
        new winston.transports.File({
          dirname: './logs',
          filename: filename ? filename : 'httpLogs.log',
        }),
        // new winston.transports.Console()
      ]
    })
    logger.log({ level, message, logData });

    callback()
  }
}