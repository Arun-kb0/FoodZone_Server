import express from 'express'
import {
  addDish, createResuturant, getAllResturants,
  getDishes,
} from '../controllers/restaurantsController'
import { auth } from '../middleware/auth' 

const router = express.Router()

router.get('/all',auth, getAllResturants)
router.get('/dishes', getDishes)


router.post('/create', createResuturant)
router.post('/addDish', addDish)


export default router