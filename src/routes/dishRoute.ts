import express from 'express'
import { addMenu, getMenu } from '../controllers/dishController'

const router = express.Router()

router.get('/menu', getMenu)

router.post('/addMenu',addMenu)


export default router