import express, { Request, Response, NextFunction } from 'express'
import { corsOptions } from './config/corsOptions'
import cors from 'cors'
import restaurantRouter from './routes/restaurantRoutes'
import dishRouter from './routes/dishRoute'
import authRouter from './routes/authRoute'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import {  globalErrorHandler, httpLogger } from './middleware/createHttpLogs'
import { httpStatus } from './constants/httpStatus'
import { CustomError } from './util/customError'

const app = express()
dotenv.config()

const LOCALHOST_IP = process.env.LOCALHOST_IP || '0.0.0.0'
const LocalHostPort = process.env.PORT || 3000
const PORT = LocalHostPort as number
const CONNECTION_URL = process.env.CONNECTION_URL || ''



app.use(cors(corsOptions))
app.use(express.json())

// app.use(httpLogger)


app.use('/auth', authRouter)
app.use('/restaurant', restaurantRouter)
app.use('/dish', dishRouter)



app.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: "server is running" })
})


app.all('*', (req: Request, res: Response,next:NextFunction): void => {
  const error = new CustomError('route not found', httpStatus.NOT_FOUND)
  next(error)
})

app.use(globalErrorHandler)


mongoose.connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, LOCALHOST_IP, () => {
      console.log(`server running at ${LOCALHOST_IP}:${PORT}`)
    })
  )
  .catch((error) => console.log(error))