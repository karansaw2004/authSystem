import {PutObjectCommand,GetObjectCommand,HeadObjectCommand,S3Client,DeleteObjectsCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

class S3 {
    #secretAccessKey;
    #accessKeyId;
    #region;
    #bucketName;

    constructor() {
        this.#secretAccessKey = null;
        this.#accessKeyId = null;
        this.#region = null;
        this.#bucketName = null;
    }

    setCloudConfig(
        {
            secretAccessKey,
            accessKeyId,
            region,
        }
    ){
        this.#accessKeyId = accessKeyId;
        this.#secretAccessKey = secretAccessKey;
        this.#region = region;
    }
    setBucketName(
        {
            bucketName
        }
    ){
        this.#bucketName = bucketName;
    }

    #s3Client(){
        return new S3Client({
            region: this.#region,
            credentials: {
                accessKeyId: this.#accessKeyId,
                secretAccessKey: this.#secretAccessKey
            }
        });
    };

    #PutObjectCommand(fileName, contentType) {
        return new PutObjectCommand({
            Bucket: this.#bucketName,
            Key: fileName,
            ContentType: contentType,
        });
    };

    #getObjectCommand(fileName) {
        return new GetObjectCommand({
            Bucket: this.#bucketName,
            Key: fileName
        });
    }

    #headObjectCommand(fileName) {
        return new HeadObjectCommand({
            Bucket: this.#bucketName,
            Key: fileName
        });
    };

    #deleteObjectCommand(fileName) {
        return new DeleteObjectsCommand({
            Bucket: this.#bucketName,
            Key: fileName
        });
    }

    #deleteObjectsCommand(keys) {
        return new DeleteObjectsCommand({
            Bucket: this.#bucketName,
            Delete: {
                Objects: keys.map(key => ({ Key: key }))
            }
        });
    };

    async #getPreSignedUrl(client, command, expiresIn) {
        return await getSignedUrl(client, command, { expiresIn });
    }

    async getPreSignedUrl(fileName, contentType, expiresIn) {
        const client = this.#s3Client();
        const command = this.#PutObjectCommand(fileName, contentType);
        return await this.#getPreSignedUrl(client, command, expiresIn);
    }

};


export const s3 = new S3();