import { NextFunction, Request, Response } from "express"
import { restaurantModel } from "../models/restaurantModel"
import { httpStatus } from "../constants/httpStatus"
import { dishModel, dishesType } from "../models/dishModel"
import mongoose from "mongoose"
import { CustomError } from "../util/customeError"
import logger, { formatHTTPLoggerResponse } from "../logger/loggerIndex"
import { authRequest } from "../middleware/auth"
import { favoriteRestaurantType, favoriteRestaurantsModel } from "../models/favoriteModel"


export const getAllResturants = async (req: Request, res: Response, next: NextFunction) => {
  const { page = 1 } = req.query

  try {
    const LIMIT = 10
    const startIndex = (Number(page) - 1) * LIMIT
    const total = await restaurantModel.countDocuments({})
    const numberOfPages = Math.ceil(total / LIMIT)
    const restaurants = await restaurantModel.find().sort().limit(LIMIT).skip(startIndex)

    if (Number(page) > numberOfPages) {
      throw new CustomError("Page not found.", httpStatus.BAD_REQUEST)
    }

    // console.log('restaurants length - ', restaurants[0].id)
    const message = `getAllRestaurants page=${page} success`
    res.status(httpStatus.OK).json({
      message,
      currentPage: Number(page),
      numberOfPages,
      restaurants,
    })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })

  } catch (error: any) {
    next(error)
  }
}


export const getDishes = async (req: Request, res: Response, next: NextFunction) => {
  const { restaurantId, page = 1 } = req.query

  try {
    if (typeof restaurantId !== 'string') {
      throw new CustomError('restaurantId is not valid', httpStatus.BAD_REQUEST)
    }

    let isListEnd = false
    const LIMIT = 4
    const skip = (Number(page) - 1) * LIMIT

    // ! replace this with dishmoel type same as server 
    type dishModelTmpType = {
      restaurantId:string,
      dishesCount: number,
      dishes: any
    }

    const result = await dishModel.aggregate<dishModelTmpType>([
      { $match: { restaurantId: restaurantId } },
      {
        $project: {
          restaurantId: 1,
          dishesCount: {$size: "$dishes"},
          dishes: { $slice: ['$dishes', skip, LIMIT] },
        }
      }
    ])

    const message = 'getDishes success'
    result[0].dishes.length !== 0 ? isListEnd = false : isListEnd = true
    res.status(httpStatus.OK).json({
      message,
      dishes: result[0],
      currentPage: Number(page),
      numberOfPages: Math.ceil(result[0].dishesCount/LIMIT),
      isListEnd
    })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })

  } catch (error: any) {
    next(error)
  }
}

export const addFavoriteRestaurants = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { userId, body: { restaurantId } } = req
    let message: string

    const isExists = await favoriteRestaurantsModel.findOne({ userId: userId })
    let favoriteRestaurant: favoriteRestaurantType | null

    if (isExists) {
      const isRestaurantExists = await favoriteRestaurantsModel.findOne({
        userId: userId,
        restaurantId: restaurantId
      })
      if (isRestaurantExists) {
        favoriteRestaurant = await favoriteRestaurantsModel.findOneAndUpdate(
          { userId: userId },
          { $pull: { restaurantId: restaurantId } },
          { new: true }
        )
        favoriteRestaurant!.restaurantId = [restaurantId]

        message = 'favorite restaurant removed'
      } else {
        favoriteRestaurant = await favoriteRestaurantsModel.findOneAndUpdate(
          { userId: userId },
          { $addToSet: { restaurantId: restaurantId } },
          { new: true, select: { restaurantId: { $slice: -1 } } }
        )
        message = 'favorite restaurant added'
      }
    } else {
      message = 'favorite restaurant added'
      favoriteRestaurant = await favoriteRestaurantsModel.create({
        userId: userId,
        restaurantId: [restaurantId]
      })
    }


    res.status(httpStatus.OK).json({ message, restaurantId: favoriteRestaurant?.restaurantId[0] })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })

  } catch (error) {
    next(error)
  }
}

export const getFavoriteRestaurants = async (req: authRequest, res: Response, next: NextFunction) => {
  try {
    const { userId } = req
    const favoriteRestaurants = await favoriteRestaurantsModel.findOne({ userId: userId })
    const message = 'get all favorite restaurants successs'
    res.status(httpStatus.OK).json({ message, restaurantId: favoriteRestaurants?.restaurantId })
    logger.info(message, { logData: formatHTTPLoggerResponse(req, res) })
  } catch (error) {
    next(error)
  }
}


// ! need to work
export const getRecomentedRestaurants = async (req: Request, res: Response) => {

}


// * for restaurant
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