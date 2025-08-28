import express from 'express'
import { login, signup, checkAuth } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/verifyToken.js'

const app = express()

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.post('/check-auth', verifyToken, checkAuth)

export default router