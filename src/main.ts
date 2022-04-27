import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { initializeSwaggerDoc } from './shared/swagger.helpers';
import { GeneralExceptionFilter } from './filters/general-exception.filter';
import * as config from 'config';

const APP_PORT = process.env.PORT || 3000;
const APP_BASE_URL = config.get<string>('service.baseUrl');
const DOC_BASE_URL = config.get<string>('service.docsBaseUrl');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(APP_BASE_URL);

  app.enableCors({
    exposedHeaders: config.get<string>('server.cors.exposedHeaders'),
  });

  initializeSwaggerDoc(app);

  app.useGlobalFilters(new GeneralExceptionFilter());

  const adapterHost: HttpAdapterHost = app.get(HttpAdapterHost);
  const server = adapterHost.httpAdapter.getHttpServer();
  server.keepAliveTimeout = config.get<number>('server.keepAlive');

  await app.listen(APP_PORT);
}
bootstrap()
  .then(() => {
    console.info(
      `App is running on port ${APP_PORT} with baseURL=${APP_BASE_URL}`,
    );
    console.info(
      `App swagger document is running on port ${APP_PORT} with baseURL=${DOC_BASE_URL}`,
    );
  })
  .catch((e) => {
    console.error(e);
    console.info(`App exiting....`);
    process.exit(-1);
  });
