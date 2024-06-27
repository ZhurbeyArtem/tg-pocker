import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import * as sharp from 'sharp'

@Injectable()
export class UploadFilesService {
  private client: S3Client;
  private bucketName: string;


  constructor(private configService: ConfigService) {
    this.client = new S3Client({
      region: this.configService.get<string>('AWS_S3_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_S3_KEY'),
        secretAccessKey: this.configService.get<string>('AWS_S3_SECRET_ACCESS_KEY'),
      }
    });

    this.bucketName = this.configService.get<string>('AWS_S3_NAME');
  }


  async uploadFile(key: string, file: Buffer, mimeType: string) {
    try {
      await this.validateImage(file)
      const params: PutObjectCommandInput = {
        Bucket: this.bucketName,
        Key: key,
        Body: file,
        ContentType: mimeType,
      };
      await this.client.send(new PutObjectCommand(params));
      return `https://${this.bucketName}.s3.${this.configService.get<string>('AWS_S3_REGION')}.amazonaws.com/${key}`;
    } catch (error) {
      console.log(error);
      
      throw error
    }
  }

  async validateImage(buffer) {
    try {
      const image = sharp(buffer);
      const metadata = await image.metadata();
      const { width, height, format } = metadata;
      const minWidth = 100;
      const minHeight = 100;
      const maxWidth = 250;
      const maxHeight = 250;
      const allowedFormats = ['jpeg', 'png'];

      const maxFileSizeInBytes = 1 * 1024 * 1024; // 1 MB
      if (buffer.length > maxFileSizeInBytes) {
        throw new BadRequestException('File size exceeds 1 MB');
      }

      if (width < minWidth || height < minHeight) {
        throw new BadRequestException('The image is too small. Minimum dimensions 100x100 pixels');
      }

      if (width > maxWidth || height > maxHeight) {
        throw new BadRequestException('The image is too large. Maximum dimensions 250x250 pixels');
      }

      if (!allowedFormats.includes(format)) {
        throw new BadRequestException('The image format is incorrect. Allowed formats are JPG and PNG');
      }

      return true;
    } catch (error) {
      throw error
    }
  }

}
