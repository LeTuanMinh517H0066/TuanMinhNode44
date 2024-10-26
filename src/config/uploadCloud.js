import multer from 'multer';
import {v2 as cloudinary} from 'cloudinary'
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import dotenv from 'dotenv';
import { format } from 'mysql2';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// cấu hình cho multer lưu trữ file vào cloudiary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'avatar',  // define folder tren cloudinary
        format: async (req, file) => {
            // định nghĩa những file image cho phép
            const validImgFormat = ['png','jpeg','gif','webp','heic'];
            // lấy định dạng file hình từ file
            const fileFormat = file.mimetype.split('/')[1];

            if(validImgFormat.includes(fileFormat)) {
                return fileFormat;
            }
            return '.png';
        },
        tranformation: [
            {
                width: 800,
                quality: 'auto:good',
                fetch_format: 'auto'
            }
        ],
        public_id: (req, file) => {
            file.originalname.split(".")[0];
        }
    }

})

// khởi tạo multer với cloudinary storage
export const uploadCloud = multer({ storage });