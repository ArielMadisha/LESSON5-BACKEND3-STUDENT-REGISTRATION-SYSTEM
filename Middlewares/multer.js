const multer = require('multer');
const path = require('path')

// Storage config
const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename : function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random()* 999999999)
        const ext = path.extname(file.originalname)
        cb(null, file.filename + "-" + uniqueSuffix + ext)
    }
})


// File filter 
const fileFilter = (req, file, cb) => {
    // Accept only images
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }
    else{
        cb(new Error("Only image files are allowed!!!"), false)
    }
}

const upload = multer({storage, fileFilter})

module.exports = upload