import express from 'express'
import { login, signUp, socialLogin } from '../controllers/authController'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signUp)
router.post('/sociallogin', socialLogin)


export default  router