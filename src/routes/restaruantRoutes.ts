import express from 'express'
import {
  addDish, createRestaurant, getAllRestaurants,
  getDishes,addFavoriteRestaurants, getFavoriteRestaurants,
  SearchByDish, getRestaurantById
} from '../controllers/restaurantsController'
import { auth } from '../middleware/auth' 

const router = express.Router()

router.get('/all', getAllRestaurants)
router.get('/dishes', getDishes)
router.get('/favorites', auth, getFavoriteRestaurants)
router.post('/favorites', auth, addFavoriteRestaurants)
router.get('/searchdish', auth, SearchByDish)
router.get('/find',getRestaurantById)

// * restaurant routes
router.post('/create', createRestaurant)
router.post('/addDish', addDish)


export default router