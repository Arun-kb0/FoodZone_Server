import express from 'express'
import { addDish, createResuturant, getAllResturants } from '../controllers/restaurantsController'


const router = express.Router()

router.get('/all', getAllResturants)

router.post('/create', createResuturant)
router.post('/addDish', addDish)


export default router