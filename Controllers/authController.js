
const {users} = require('../Models/user')
const { v4 } = require('uuid')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    users.push({id: v4(), name, email, password, isStudent: false, profilePic: null})

    res.status(200).json({
        message : "User create sucessfully."
    })
}

const login = async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({
            message: "Missed email or password"
        })
    }

    const user = users.find(u => u.email == email && u.password == password)

    if(!user) {
        return res.status(400).json({
            message: "User not found or Password is wrong"
        })
    }

    const token = jwt.sign({ id: user.id }, "hellothisisasecret", {expiresIn: '5m'})

    res.status(200).json({
        token
    })
}


const getProfile = async (req, res) => {
    console.log(req.user)
    const user = users.filter(u => u.id == req.user.id)

    res.status(200).json({
        user
    })

}

const addProfilePic = async (req, res) => {
    if(!req.file) {
        return res.status(400).json({message: 'No file uploaded'})
    }

    const userId = req.user.id

    const user = users.find(u => u.id == userId)

    user.profilePic = req.file.path


    res.status(200).json({
        message: 'File is uploaded successfully',
        file: {
            filename: req.file.filename,
            path: req.file.path,
            size: req.file.size
        }
    })
}



module.exports = { registerUser, login, getProfile, addProfilePic }