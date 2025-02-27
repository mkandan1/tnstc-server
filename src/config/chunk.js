import { S3Client } from '@aws-sdk/client-s3'
import multer from 'multer'
import multerS3 from 'multer-s3'
import dotenv from 'dotenv'
import config from './config.js'

dotenv.config();

const s3 = new S3Client({
    region: config.aws.region,
    credentials: {
        accessKeyId: config.aws.accessId,
        secretAccessKey: config.aws.accessKey,
    }
});

const uploadBusPhoto = multer({
    storage: multerS3({
        s3: s3,
        bucket: config.aws.bucketName,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, `uploads/buses/${fileName}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit to 5MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
});

export { uploadBusPhoto, s3 };
