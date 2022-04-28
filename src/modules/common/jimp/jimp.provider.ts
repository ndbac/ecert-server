import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';
import { IMediaLocalPath, IamPhotoType } from 'src/shared/types';
import { cloudinaryUploadImg } from 'src/modules/adapters/cloudinary/cloudinary.config';
import * as fs from 'fs';

@Injectable()
export class JimpService {
  async resizePhoto(filePath: string, width: number) {
    const image = await Jimp.read(filePath);
    await image.resize(width, Jimp.AUTO).writeAsync(filePath);
  }

  async addText(
    filePath: string,
    text: string,
    name: string,
    extension: IamPhotoType,
  ) {
    try {
      const image = await Jimp.read(filePath);
      const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
      const savePath = `temp/${IMediaLocalPath.TEXT_ADDED_PHOTO}/${name}.${extension}`;
      await image.print(font, 15, 15, text).writeAsync(savePath);
      // fs.unlinkSync(filePath);
      return savePath;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addWatermark(
    imagePath: string,
    watermarkPath: string,
    name: string,
    extension: IamPhotoType,
  ) {
    try {
      const watermark = await Jimp.read(watermarkPath);
      const image = await Jimp.read(imagePath);

      const X = await this.genXPosition(image, watermark, 5);
      const Y = await this.genYPosition(image, watermark, 5);

      image.composite(watermark, X, Y, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1,
      });
      const savePath = `temp/${IMediaLocalPath.QR_ADDED_PHOTO}/${name}.${extension}`;
      await image.writeAsync(savePath);
      // const photo = await cloudinaryUploadImg(savePath);
      // fs.unlinkSync(savePath);
      fs.unlinkSync(imagePath);
      fs.unlinkSync(watermarkPath);
      // return photo.url;
      return 'successed';
    } catch (error) {
      throw new Error(error);
    }
  }

  private async genXPosition(image: any, watermark: any, percentage: number) {
    const xMargin = (image.bitmap.width * percentage) / 100;
    if (watermark === null) {
      return image.bitmap.width - xMargin;
    }
    return image.bitmap.width - watermark.bitmap.width - xMargin;
  }

  private async genYPosition(image: any, watermark: any, percentage: number) {
    const yMargin = (image.bitmap.width * percentage) / 100;
    if (watermark === null) {
      return image.bitmap.height - yMargin;
    }
    return image.bitmap.height - watermark.bitmap.height - yMargin;
  }
}
