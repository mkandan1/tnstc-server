import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import config from "../config/config.js"
import { s3 } from "../config/chunk.js"

const deleteObjectFromS3 = async (key) => {
    try {
        await s3.send(
            new DeleteObjectCommand({
                Bucket: config.aws.bucketName,
                Key: key
            }))

    }
    catch (err) {
        throw new Error("Failed to delete: ", err)
    }
}

export {
    deleteObjectFromS3
}