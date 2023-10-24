import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { httpStatus } from '../constants/httpStatus';

// ! finish auth  , add git attributes , delete v1 branch and cretate new 

export interface authRequest extends Request {
  userId?: string
}

export const auth = async (req: authRequest, res: Response, next: NextFunction) => {

  try {
    const token = req.headers?.authorization?.split(" ")[1]
    const provider = req.headers?.tokenprovider
    console.log('token length ', token?.length)
    console.log('provider ', provider)
    // console.log(req.headers)

    if (token && provider) {
      let decodedData
      if (provider === 'server') {
        console.log("user token")
        const secret = process.env.JWT_SECRET_KEY || ''
        decodedData = jwt.verify(token, secret)

      } else if (provider === 'google') {
        console.log("google token")
        const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`)
        if (response.ok) {
          decodedData = await response.json()
          const currentTime = Math.floor(Date.now() / 1000)
          const isTokenExpierd = currentTime >= parseInt(decodedData.exp)
          if (isTokenExpierd) {
            throw new Error('accessToken expierd')
          }
          req.userId = decodedData?.sub
        } else {
          console.log('error google token decode failed')
          throw new Error('accessToken rejected')
        }

      } else if (provider === 'meta') {
        console.log('meta token')
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`)
        if (response.ok) {
          decodedData = await response.json()
          req.userId = decodedData?.id
        }
      }
      console.log(decodedData)
    }
    next()

  } catch (error: any) {
    console.log(error)
    if (error.message === 'accessToken expierd') {
      res.status(httpStatus.UNAUTHORIZED).json({
        error: 'accessToken expierd',
        message: "accessToken has expierd"
      })
    }
    res.status(httpStatus.FORBIDDEN).json({
      error: 'accessToken rejected',
      message: "The access token is not valid or has been rejected for this request"
    })
  }
}
