const express = require('express')
const router = express.Router()
const { admitStudent } = require('../Controllers/admissionController')
const authMiddleware = require('../Middlewares/authMiddleware')


router.post('/admitStudent', authMiddleware, admitStudent)

module.exports = router