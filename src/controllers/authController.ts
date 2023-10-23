import { Request, Response } from "express"
import { httpStatus } from "../constants/httpStatus"
import { userModel } from "../models/userModel"



export const login = async (req: Request, res: Response) => {
  try {
    res.status(httpStatus.OK).json({ message: "login success" })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "login failed" })
  }
}


export const signUp = async (req: Request, res: Response) => {
  try {
    res.status(httpStatus.OK).json({ message: "signup success" })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "signup failed" })
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