import { Request, Response } from "express"
import { httpStatus } from "../constants/httpStatus"
import { menuModel } from "../models/menuModel"



export const getMenu = async (req: Request, res: Response) => {
  try {
    const menu = await menuModel.find({})
    res.status(httpStatus.OK).json({ message: 'getDishMenu success' ,menu})
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: 'getDishMenu failed' })
  }
}


export const addMenu = async (req: Request, res: Response) => {
  const data = req.body

  try {
    const newMenu = new menuModel({...data})
    const menu = await newMenu.save()
    res.status(httpStatus.OK).json({message:"add Menu success" , menu})
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({message:"add Menu faild",error})
  }
}
