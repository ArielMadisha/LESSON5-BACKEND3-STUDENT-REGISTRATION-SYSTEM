const express = require('express')
const router = express.Router()
const { registerUser, login, getProfile, addProfilePic } = require('../Controllers/authController')
const authMiddleware = require('../Middlewares/authMiddleware')
const upload = require('../Middlewares/multer')


router.post('/register', registerUser)

router.post('/login', login)

router.get('/profile', authMiddleware ,getProfile)

router.post('/addProfilePic', authMiddleware, upload.single('file'), addProfilePic)

module.exports = router