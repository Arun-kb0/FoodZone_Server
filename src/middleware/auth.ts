import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { httpStatus } from '../constants/httpStatus';
import { CustomError } from '../util/customeError';


export interface authRequest extends Request {
  userId?: string
}

export const auth = async (req: authRequest, res: Response, next: NextFunction) => {

  try {
    const token = req.headers?.authorization?.split(" ")[1]
    const provider = req.headers?.tokenprovider
    console.log('token length ', token?.length)
    // console.log('provider ', provider)
    // console.log(req.headers)

    if (!token || !provider) {
      throw new CustomError('token and provider is requiered in headder', httpStatus.UNAUTHORIZED)
    }
    let decodedData
    if (provider === 'custom') {
      console.log("user token")
      const secret = process.env.JWT_ACCESSTOKEN_SECRECT || ''
      decodedData = jwt.verify(token, secret)
      if (!decodedData || typeof (decodedData) === 'string') {
        throw new CustomError('jwt expiered',httpStatus.UNAUTHORIZED)
      }
      req.userId = decodedData?.id
      console.log("decodedData ", decodedData)

    } else if (provider === 'google') {
      console.log("google token")
      const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
      if (response.ok) {
        decodedData = await response.json()
        const currentTime = Math.floor(Date.now() / 1000)
        const isTokenExpierd = currentTime >= parseInt(decodedData.exp)
        if (isTokenExpierd) {
          throw new CustomError('Google accessToken expierd', httpStatus.UNAUTHORIZED)
        }
        req.userId = decodedData?.sub
        console.log('Google token is valid')
      } else {
        throw new CustomError('Google accessToken rejected', httpStatus.UNAUTHORIZED)
      }

    } else if (provider === 'meta') {
      console.log('meta token')
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
      if (response.ok) {
        decodedData = await response.json()
        req.userId = decodedData?.id
      }
      // console.log('meta token is valid')
    }

    next()

  } catch (error: any) {
    console.log(error.message)
    next(error)
  }

}

