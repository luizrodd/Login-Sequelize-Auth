const {Router} = require('express')
const authController = require('../controllers/AuthController')
const router = Router()

router.post('/auth/login', authController.Login)

module.exports = router