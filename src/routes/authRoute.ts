import express from 'express'
import { login, refresh, signUp, socialLogin } from '../controllers/authController'

const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/sociallogin', socialLogin)
router.get('/refresh',refresh)


export default  router