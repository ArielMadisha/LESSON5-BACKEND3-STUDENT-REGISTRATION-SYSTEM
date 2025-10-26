const {users} = require('../Models/user')
const jwt = require('jsonwebtoken')


const admitStudent = async (req, res) => {
    const { math, science, english, politics } = req.body

    const userId = req.user.id

    const average = (math + science + english + politics) / 4

    const user = users.find(u => u.id == userId)
    

    if(!user) {
        return res.status(400).json({message: "User not found"})
    }

    if(average <= 50 ){
       
        return res.status(200).json({
            message : "Sorry we cannot take you in as per our criteria."
        })
    }

    user.isStudent = true
    return res.status(200).json({
        message: "Welcome to the Institution."
    })
}


module.exports = { admitStudent }