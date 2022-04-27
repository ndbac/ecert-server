import { Module } from '@nestjs/common';
import { JimpService } from './jimp.provider';

@Module({
  providers: [JimpService],
  exports: [JimpService],
})
export class JimpModule {}
