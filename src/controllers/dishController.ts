import { NextFunction, Request, Response } from "express"
import { httpStatus } from "../constants/httpStatus"
import { menuModel } from "../models/menuModel"
import logger, { formatHTTPLoggerResponse } from "../logger/loggerIndex"


export const getMenu = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menu = await menuModel.find({})
    const message = 'getDishMenu success'
    res.status(httpStatus.OK).json({ message, menu })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })
  } catch (error) {
    next(error)
    res.status(httpStatus.BAD_REQUEST).json({ message: 'getDishMenu failed' })
  }
}


export const addMenu = async (req: Request, res: Response) => {
  const data = req.body

  try {
    const newMenu = new menuModel({ ...data })
    const menu = await newMenu.save()
    res.status(httpStatus.OK).json({ message: "add Menu success", menu })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "add Menu failed", error })
  }
}
