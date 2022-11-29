"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudinaryUpload = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
const error_1 = require("../utils/error");
const storage = multer_1.default.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 },
    fileFilter: fileFilter
});
function cloudinaryUpload(req, res, next) {
    if (req.file) {
        const imgPath = req.file.path;
        cloudinary_1.v2.uploader.upload(imgPath)
            .then((uploadedImage) => {
            res.locals.img = {
                imgUrl: uploadedImage.secure_url,
                imgId: uploadedImage.public_id
            };
            fs_1.default.unlinkSync(imgPath); //remove file from upload folder
            return next();
        })
            .catch((error) => {
            throw new error_1.clientError(`unable to upload image: ${error.message}`, 400);
        });
    }
    else
        return next();
    // const imageData =[]
    // const files = req.files
    // const upload = async (path: string) => {
    //    return await v2.uploader.upload(path)
    // }
    // for (let file in files ) {
    //     let imgFile = file as unknown as Express.Multer.File[]
    //     console.log("each file",imgFile.path)
    //     upload(imgFile.path)
    //     .then( (img) => {
    //         let uploadedImage = img
    //         imageData.push({
    //             imgUrl: uploadedImage.secure_url,
    //             imgId: uploadedImage.public_id
    //         })
    //         fs.unlinkSync(imgFile.path) //delete file from its folder
    //     } )
    //     .catch ( (error) => {
    //         throw new clientError(`unable to upload image: ${error.message}`, 400)
    //     } )
    // }
    // res.locals.imageArr = req.imageData
    // return next()
}
exports.cloudinaryUpload = cloudinaryUpload;
