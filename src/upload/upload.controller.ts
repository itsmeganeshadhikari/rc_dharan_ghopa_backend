import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { Express } from 'express';
import { log } from 'console';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post('member-photo')
  @UseInterceptors(FileInterceptor('file'))
  async uploadMemberPhoto(@UploadedFile() file: Express.Multer.File) {
    log('Uploading file:', file?.originalname);
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const result = await this.cloudinaryService.uploadMemberPhoto(
      file.buffer,
      file.originalname,
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  }
}
