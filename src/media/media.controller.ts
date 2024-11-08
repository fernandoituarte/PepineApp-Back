import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from './helpers/fileFilter';
import { fileNamer } from './helpers/fileNamer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateMediaResponse,
  ApiDeleteMediaResponse,
  ApiGetMediaResponse,
} from './decorators';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly configService: ConfigService,
  ) {}
  /**
   * Uploads an image file to the server.
   *
   * @param files - Array of uploaded files sent with the request.
   * @returns An object containing the status, a success message, and an array of secure URLs for the uploaded images.
   * @throws BadRequestException if no files are uploaded or if the file is not an image.
   */
  @Post()
  @Auth(ValidRoles.admin)
  @UseInterceptors(
    FilesInterceptor('file', undefined, {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  @ApiCreateMediaResponse()
  uploadImage(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
  ): { status: number; message: string; secureUrls: string[] } {
    if (!files || files.length === 0) {
      console.log(files);
      throw new BadRequestException(
        'Please ensure the file is an image in one of the following formats: jpg, jpeg, png, gif, or webp.',
      );
    }

    const secureUrls: string[] = files.map((file) => {
      return `${this.configService.get('HOST_NAME')}/media/${file.filename}`;
    });

    return { status: 201, message: 'Media created successfully.', secureUrls };
  }

  /**
   * Retrieves an image file from the server by its name.
   *
   * @param imageName - The name of the image to retrieve.
   * @param res - The response object used to send the image file.
   */
  @Get(':imageName')
  @ApiGetMediaResponse()
  findOne(@Res() res: Response, @Param('imageName') imageName: string) {
    const image = this.mediaService.getImage(imageName);
    res.sendFile(image);
  }

  /**
   * Deletes an image file from the server by its name.
   *
   * @param imageName - The name of the image to delete.
   * @returns A confirmation object indicating the success of the deletion.
   */
  @Delete(':imageName')
  @Auth(ValidRoles.admin)
  @ApiDeleteMediaResponse()
  remove(
    @Param('imageName') imageName: string,
  ): Promise<{ status: number; message: string }> {
    return this.mediaService.deleteImage(imageName);
  }
}
