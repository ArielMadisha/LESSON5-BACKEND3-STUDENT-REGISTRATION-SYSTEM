const express = require('express')
const authRoutes = require('./Routes/authRoute')
const admissionRoutes = require('./Routes/admissionRoute')
const path = require('path')


const app = express()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(express.json())


app.use('/api/v1/auth', authRoutes)

app.use('/api/v1/admission', admissionRoutes)

app.listen(3000, () => console.log('Server running on port 3000'))