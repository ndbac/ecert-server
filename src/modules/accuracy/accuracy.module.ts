import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CommonModule } from '../common/common.module';
import { AccuracyCoreModule } from './accuracy.core.module';
import { AccuracyService } from './providers/accuracy.service';
import { AccuracyController } from './controllers/accuracy.controller';
import { AuthCoreModule } from '../auth/auth.core.module';
import { UserMiddleware } from 'src/middlewares/user.middleware';
import { QRCodeService } from 'src/modules/common/qrcode/qrcode.provider';
import { CryptoService } from 'src/modules/common/crypto/crypto.service';
import { JimpService } from 'src/modules/common/jimp/jimp.provider';
import { UserAccuracyController } from './controllers/user-accuracy.controller';
import { UserAccuracyService } from './providers/user-accuracy.service';

@Module({
  imports: [AccuracyCoreModule, CommonModule, AuthCoreModule],
  providers: [
    AccuracyService,
    QRCodeService,
    CryptoService,
    JimpService,
    UserAccuracyService,
  ],
  controllers: [AccuracyController, UserAccuracyController],
})
export class AccuracyModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(AccuracyController);
  }
}
