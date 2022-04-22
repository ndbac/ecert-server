import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { initializeSwaggerDoc } from './shared/swagger.helpers';
import { GeneralExceptionFilter } from './filters/general-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  initializeSwaggerDoc(app);

  app.useGlobalFilters(new GeneralExceptionFilter());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
