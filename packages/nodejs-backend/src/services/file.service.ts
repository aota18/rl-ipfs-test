import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class FileService {
  public async uploadFile(imageBuffer: Buffer, fileName: string) {
    const s3 = new S3();
    return await s3
      .upload({
        Bucket: process.env.S3_BUCKET_NAME!,
        Body: imageBuffer,
        Key: fileName,
        ContentType: 'image/png',
        ContentDisposition: 'inline; filename=filename.png',
        ACL: 'public-read',
      })
      .promise();
  }

  public async deleteFile(key: string) {
    const s3 = new S3();
    return await s3
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: key,
      })
      .promise();
  }
}
