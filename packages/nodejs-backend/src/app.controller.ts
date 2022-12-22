import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { imageFilter } from './controllers/file-helper';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadService } from './services/upload.service';

// export const uploadFile =
//   (fileName: string = 'file'): MethodDecorator =>
//   (target: any, propertyKey, descriptor: PropertyDescriptor) => {
//     ApiBody({
//       schema: {
//         type: 'object',
//         properties: {
//           [fileName]: {
//             type: 'string',
//             format: 'binary',
//           },
//         },
//       },
//     });
//   };
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly uploadService: UploadService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/deploy')
  deploy() {
    return this.appService.deploy();
  }

  @Get('/test-contract')
  testContract() {
    return this.appService.testContract();
  }

  @Post('/upload')
  // @uploadFile('filename')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageFilter,
    }),
  )
  async uploadFile(@Req() req: any, @UploadedFile() file: any) {
    if (!file || req.fileValidationError) {
      console.log(file);

      throw new BadRequestException(
        'invalid file provided, [image files allowed]',
      );
    }

    console.log(file);
    const buffer = file.buffer;
    // In s3 upload, you just need buffer

    return this.uploadService.addAvatar(buffer, 'user/test');
  }
}
