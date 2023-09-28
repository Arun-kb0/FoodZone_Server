import winston, { format, LogEntry } from 'winston'
import Trasport, { TransportStreamOptions } from 'winston-transport'



export class customeTrasport extends Trasport {
  constructor(opts: TransportStreamOptions) {
    super(opts)
  }

  log(info: LogEntry, callback: () => void) {
    setImmediate(() => {
      this.emit('logged', info)
    })
    const { level, message, meta: { filename } } = info
    console.log('custome logger ', filename)

    // !
    const logger = winston.createLogger({
      format: format.combine(
        format.timestamp(),
        format.json()
        // format.errors({ stack: true }),
      ),
      transports: [
        new winston.transports.File({
          dirname: './logs',
          filename: filename,
        }),
        new winston.transports.Console()
      ]
    })

    logger.log({ level, message });

    new winston.transports.Console()

    callback()
  }
}