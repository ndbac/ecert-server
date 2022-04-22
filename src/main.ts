import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { initializeSwaggerDoc } from './shared/swagger.helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwaggerDoc(app);

  await app.listen(process.env.PORT || 3000);
}
bootstrap(
);
