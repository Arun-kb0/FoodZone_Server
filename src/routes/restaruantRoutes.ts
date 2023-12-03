import express from 'express'
import {
  addDish, createResuturant, getAllResturants,
  getDishes,
  addFavoriteRestaurants, getFavoriteRestaurants
} from '../controllers/restaurantsController'
import { auth } from '../middleware/auth' 

const router = express.Router()

router.get('/all', getAllResturants)
router.get('/dishes', getDishes)
router.get('/favorites', auth, getFavoriteRestaurants)
router.post('/favorites', auth, addFavoriteRestaurants)

// * resturant routes
router.post('/create', createResuturant)
router.post('/addDish', addDish)


export default router