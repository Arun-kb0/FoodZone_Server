import express, { Request, Response, NextFunction } from 'express'
import { corsOptions } from './config/corsOptions'
import cors from 'cors'
import restaruantRouter from './routes/restaruantRoutes'
import dishRouter from './routes/dishRoute'
import authRouter from './routes/authRoute'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { logHttpErrors, logRequests } from './middleware/createHttpLogs'
import logger from './logger/loggerIndex'


const app = express()
dotenv.config()

const LOCALHOST_IP = process.env.LOCALHOST_IP || '0.0.0.0'
const LocalHostport = process.env.PORT || 3000
const PORT = LocalHostport as number
const CONNECTION_URL = process.env.CONNECTION_URL || ''



app.use(cors(corsOptions))
app.use(express.json())

app.use(logRequests)


// logger.log('info', 'request log success', { meta: { filename: 'request.log' } })
// logger.log('info', 'res log success', { meta: { filename: 'response.log' } })
// logger.log('info', 'http error log success', { meta: { filename: 'httpError.log' } })
// logger.log('error', 'error log success', { meta: { filename: 'error.log' } })


app.use('/auth', authRouter)
app.use('/restaurant', restaruantRouter)
app.use('/dish', dishRouter)



app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: "hellow" })
})


app.use(logHttpErrors)

mongoose.connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, LOCALHOST_IP, () => {
      console.log(`server running at ${LOCALHOST_IP}:${PORT}`)
    })
  )
  .catch((error) => console.log(error))