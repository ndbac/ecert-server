import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';

@Injectable()
export class JimpService {
  async addText(filePath: string, text: string) {
    try {
      const image = await Jimp.read(filePath);
      const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
      image.print(font, 50, 50, text).write(filePath);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addWatermark(imagePath: string, watermarkPath: string) {
    try {
      const watermark = await Jimp.read(watermarkPath);
      const image = await Jimp.read(imagePath);
      image.composite(watermark, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 1,
      });
      await image.writeAsync('public/newImage.png');
    } catch (error) {
      throw new Error(error);
    }
  }
}
