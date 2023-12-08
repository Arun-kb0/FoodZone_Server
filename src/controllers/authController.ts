import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { httpStatus } from "../constants/httpStatus"
import { userModel } from "../models/userModel"
import logger, { formatHTTPLoggerResponse } from "../logger/loggerIndex"
import { CustomError } from "../util/customError"


type generateTokenParamsType = {
  email: string,
  id: string
}
export const generateAccessToken = ({ email, id }: generateTokenParamsType) => {
  const secret = process.env.JWT_ACCESSTOKEN_SECRET || ''
  const accessToken = jwt.sign({
    email, id
  }, secret, { expiresIn: '1h' })
  return accessToken
}
export const generateRefreshToken = ({ email, id }: generateTokenParamsType) => {
  const secret = process.env.JWT_REFRESHTOKEN_SECRET || ''
  const refreshToken = jwt.sign({
    email, id
  }, secret, { expiresIn: '7d' })
  return refreshToken
}



export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  const { name, imageUrl, email, password, phone } = req.body
  try {

    if ((!name || !email || !password) || (name?.length === 0 || email?.length === 0 || password?.length === 0)) {
      throw new CustomError('Some of the required fields are empty', httpStatus.BAD_REQUEST)
    }

    const isEmailExists = await userModel.findOne({ email: email })
    if (isEmailExists) {
      throw new CustomError('An account with this email already exists', httpStatus.CONFLICT)
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await userModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      imageUrl: imageUrl,
      phone: phone
    })
    const updatedUser = await userModel.findByIdAndUpdate(
      newUser?._id,
      { id: newUser?._id },
      { new: true }
    )
    if (!updatedUser) {
      throw new Error('user creation failed')
    }

    const accessToken = generateAccessToken({
      email: updatedUser.email,
      id: updatedUser.id
    })
    const refreshToken = generateRefreshToken({
      email: updatedUser.email,
      id: updatedUser.id
    })

    const user = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl,
      phone: updatedUser.phone
    }

    const message = "signup success"
    res.status(httpStatus.OK).json({
      accessToken,
      refreshToken,
      user,
      message
    })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })

  } catch (error: any) {
    next(error)
  }
}


export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    if ((!email || !password) || (email?.length === 0 || password?.length === 0)) {
      throw new CustomError('required fields are empty', httpStatus.BAD_REQUEST)
    }
    const isUserExist = await userModel.findOne({ email: email })
    if (!isUserExist) {
      throw new CustomError('user not found', httpStatus.BAD_REQUEST)
    }
    const isPasswordOk = await bcrypt.compare(password, isUserExist.password)
    if (!isPasswordOk) {
      throw new CustomError('password not valid', httpStatus.BAD_REQUEST)
    }

    const accessToken = generateAccessToken({
      email: isUserExist.email,
      id: isUserExist.id
    })
    const refreshToken = generateRefreshToken({
      email: isUserExist.email,
      id: isUserExist.id
    })

    const message = "login success"
    res.status(httpStatus.OK).json({
      accessToken,
      refreshToken,
      user: isUserExist,
      message
    })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })
  } catch (error: any) {
    next(error)
  }
}


export const socialLogin = async (req: Request, res: Response , next:NextFunction) => {
  const { id, name, email, photo, phone } = req.body
  try {
    const user = await userModel.findOne({ id: id })
    let newUser
    if (!user) {
      newUser = await userModel.create({
        id, name, email, photo, phone
      })
    } else {
      console.log('user already exists')
    }
    const message = 'social login success'
    res.status(httpStatus.OK).json({ message, newUser })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res, message) })
  } catch (error: any) {
    next(error)
  }
}


export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.query
  try {
    if (!refreshToken || typeof (refreshToken) !== 'string' || refreshToken?.length === 0) {
      throw new CustomError('Query is empty or not a string', httpStatus.BAD_REQUEST)
    }

    const secret = process.env.JWT_REFRESHTOKEN_SECRET || ''
    const decodedData = jwt.verify(refreshToken, secret)
    if (typeof (decodedData) === 'string') {
      throw new CustomError('invalid refresh token', httpStatus.FORBIDDEN)
    }

    const newAccessToken = generateAccessToken({
      id: decodedData?.id,
      email: decodedData?.email
    })
    const message = 'refresh success'
    res.status(httpStatus.OK).json({
      accessToken: newAccessToken,
      message
    })
    logger.info(message,{ logData: formatHTTPLoggerResponse(req, res) })
  } catch (error: any) {
    next(error)
  }

}