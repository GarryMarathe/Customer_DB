// Multer to upload the data/files

import multer from "multer";
import path from "path";

// Set up Multer storage options

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/')
    },
    filename: (req,file,cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

export default upload;