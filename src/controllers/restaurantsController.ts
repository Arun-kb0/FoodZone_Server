import { Request, Response } from "express"
import { restaurantModel } from "../models/restaurantModel"
import { httpStatus } from "../constants/httpStatus"
import { dishModel, dishType, dishesType } from "../models/dishModel"
import mongoose from "mongoose"


export const getAllResturants = async (req: Request, res: Response) => {
  const { page = 1 } = req.query

  try {
    const LIMIT = 5
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await restaurantModel.countDocuments({})
    const numberOfPages = Math.ceil(total / LIMIT)
    const restaurants = await restaurantModel.find().sort().limit(LIMIT).skip(startIndex)
    console.log(restaurants.length)

    if (Number(page) > numberOfPages) {
      res.status(httpStatus.NO_CONTENT).json({ message: "getAllRestaurants faild" })
      return
    }
    res.status(httpStatus.OK).json({
      message: "getAllRestaurants success",
      currentPage: Number(page),
      numberOfPages,
      restaurants,
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(httpStatus.BAD_REQUEST).json({ message: "getAllRestaurants faild", error: error.message })
  }
}


export const getRecomentedRestaurants = async (req: Request, res: Response) => {

}


export const getDishes = async (req: Request, res: Response) => {
  const { restaurantId } = req.query

  try {
    if (typeof restaurantId === 'string' && restaurantId.length === 24) {
      const restaurantObjId = mongoose.Types.ObjectId.createFromHexString(restaurantId)
      const dishes = await dishModel.findById(restaurantObjId)
      res.status(httpStatus.OK).json({ message: 'getDishes success', dishes })
      return
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ message: 'restaurantId is not valid' })
      return
    }
  } catch (error) {
    console.log(error)
    res.status(httpStatus.BAD_REQUEST).json({ message: 'getDishes failed', error })
  }
}








export const createResuturant = async (req: Request, res: Response) => {
  const data = req.body
  const newRestaurant = new restaurantModel({
    ...data,
  })

  try {
    const resturant = await newRestaurant.save()
    res.status(httpStatus.OK).json({ message: "postRestaurant success", resturant })
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ message: "postRestaurant failed", error })
  }

}

export const addDish = async (req: Request, res: Response) => {
  const { restaurantId, data } = req.body
  // console.log(req.body)
  try {
    const restaurantObjId = mongoose.Types.ObjectId.createFromHexString(restaurantId)
    const isResturantDishesExsist = await dishModel.findById(restaurantObjId)
    console.log(isResturantDishesExsist)

    let addedDish: dishesType | null
    if (isResturantDishesExsist) {
      addedDish = await dishModel.findByIdAndUpdate(
        { _id: restaurantObjId },
        { $push: { dishes: data } },
        { new: true, select: { dishes: { $slice: -1 } } }
      )
    } else {
      const newDish = new dishModel({
        id: restaurantId,
        dishes: [data]
      })
      addedDish = await newDish.save()
    }

    res.status(httpStatus.OK).json({ message: "addDish success", addedDish })
  } catch (error) {
    console.log(error)
    res.status(httpStatus.BAD_REQUEST).json({ message: "addDish faild", error: error })
  }
}

