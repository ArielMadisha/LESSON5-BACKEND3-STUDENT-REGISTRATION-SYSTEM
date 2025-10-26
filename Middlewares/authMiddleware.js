const jwt = require('jsonwebtoken');


const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization']

    if(!authHeader) {
        return res.status(401).json({
            message: "Auth header missing or malformed"
        })
    }

    try{
        const decoded = jwt.verify(authHeader, "hellothisisasecret")

        req.user = decoded

        next()
    }
    catch(err){
        return res.status(400).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware