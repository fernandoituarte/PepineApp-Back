import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';

@Injectable()
export class MediaService {
  getImage(imageName: string) {
    const url = join(process.cwd(), 'static/products', imageName);
    if (!existsSync(url)) {
      throw new NotFoundException(`No image found with id ${imageName}`);
    }
    return url;
  }
  async deleteImage(
    imageName: string,
  ): Promise<{ status: number; message: string }> {
    const url = join(process.cwd(), 'static/products', imageName);
    if (!existsSync(url)) {
      throw new NotFoundException(`No image found with id ${imageName}`);
    }
    unlinkSync(url);

    return { status: 201, message: `Image ${imageName} successfully deleted.` };
  }
}
