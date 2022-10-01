import multer from "multer"
import { Request, Response, NextFunction } from "express"
import { v2 } from "cloudinary" 
import fs from "fs"


 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, "../uploads")
    }
} )

const fileFilter = (req:Request, file: Express.Multer.File, cb :multer.FileFilterCallback ) => {

    if ( file.mimetype === "image/jpeg" ) {
        cb(null, true)
    } else {
        cb( null, false )
    }

}

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024*1024 },
    fileFilter: fileFilter
})


interface IRequest extends Request{
    imageData?: {
        imgUrl: string,
        imgId: string
    }[]
}


export async function cloudinaryUpload (req: IRequest, res: Response, next: NextFunction) {

    const imageData =[]
    const files = req.files
    
    const upload = async (path: string) => {
       return await v2.uploader.upload(path)
    }
    
    for (let file in files ) {
        let imgFile = file as unknown as Express.Multer.File 

        let uploadedImage = await upload(imgFile.path) //upload to cloudinary
        imageData.push({
            imgUrl: uploadedImage.secure_url,
            imgId: uploadedImage.public_id
        })

        fs.unlinkSync(imgFile.path) //delete file from its folder
    }

    res.locals.imageArr = req.imageData

    return next()
}