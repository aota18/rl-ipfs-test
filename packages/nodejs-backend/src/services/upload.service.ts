import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService } from './file.service';

@Injectable()
export class UploadService {
  constructor(private readonly fileService: FileService) {}

  async addAvatar(imageBuffer: Buffer, fileName: string) {
    return await this.fileService.uploadFile(imageBuffer, fileName);
  }

  async addEventImage(imageBuffer: Buffer, fileName: string) {
    return await this.fileService.uploadFile(imageBuffer, fileName);
  }
}
