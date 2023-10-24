import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { httpStatus } from "../constants/httpStatus"
import { userModel } from "../models/userModel"
import { CustomeErrorTypes } from "../constants/customeErrorTypes"


export const signUp = async (req: Request, res: Response) => {
  const { name, imageUrl, email, password, phone } = req.body
  try {

    if ((!name || !email || !password) || (name?.length === 0 || email?.length === 0 || password?.length === 0)) {
      throw new Error(CustomeErrorTypes.EmptyFieldError)
    }

    const isEmailExists = await userModel.findOne({ email: email })
    if (isEmailExists) {
      throw new Error(CustomeErrorTypes.EmailExists)
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

    const secrect = process.env.JWT_SECRECT || ''
    const accessToken = jwt.sign({
      email: updatedUser.email,
      id:updatedUser.id
    }, secrect, { expiresIn: '1h' })
    
    const user = {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      imageUrl: updatedUser.imageUrl,
      phone: updatedUser.phone
    }

    res.status(httpStatus.OK).json({
      accessToken: accessToken,
      user,
      message: "signup success",
    })

  } catch (error: any) {
    // console.log(error)

    if (error?.message === CustomeErrorTypes.EmailExists) {
      return res.status(httpStatus.CONFLICT).json({
        error: CustomeErrorTypes.EmailExists,
        message: "An account with this email already exists."
      })
    }
    if (error?.message === CustomeErrorTypes.EmptyFieldError) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: CustomeErrorTypes.EmptyFieldError,
        message: 'Some of the required fields are empty'
      })
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "signup failed"
    })
  }
}


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    if ((!email || !password ) || (email?.length === 0 || password?.length === 0)) {
      throw new Error(CustomeErrorTypes.EmptyFieldError)
    }
    const isUserExist = await userModel.findOne({ email: email })
    if (!isUserExist) {
      throw new Error(CustomeErrorTypes.UserNotFound)
    }
    const isPasswordOk = await bcrypt.compare(password, isUserExist.password)
    if (!isPasswordOk) {
      throw new Error(CustomeErrorTypes.PasswordNotValid)
    }

    const secrect = process.env.JWT_SECRECT || ''
    const accessToken = jwt.sign({
      email: isUserExist.email,
      id: isUserExist.id
    }, secrect, { expiresIn: '1h' })

    res.status(httpStatus.OK).json({
      accessToken: accessToken,
      user: isUserExist,
      message: "login success"
    })

  } catch (error: any) {
    console.log(error)

    if (error?.message === CustomeErrorTypes.EmptyFieldError) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: CustomeErrorTypes.EmptyFieldError,
        message: 'Some of the required fields are empty'
      })
    }
    if (error?.message === CustomeErrorTypes.UserNotFound) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: CustomeErrorTypes.UserNotFound,
        message: "User with given email is not found",
      })
    }
    if (error?.message === CustomeErrorTypes.PasswordNotValid) {
      return res.status(httpStatus.BAD_REQUEST).json({
        error: CustomeErrorTypes.PasswordNotValid,
        message: "Invalid password",
      })
    }

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      error: error.message,
      message: "login failed",
    })

  }
}


export const socialLogin = async (req: Request, res: Response) => {
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
    res.status(httpStatus.OK).json({ message: "social login success", newUser })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "social login failed" })
  }
}