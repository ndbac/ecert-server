import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as config from 'config';

export function initializeSwaggerDoc(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(config.get<string>('service.name'))
    .setDescription(config.get<string>('service.description'))
    .setVersion(config.get<string>('service.apiVersion'))
    .addServer(`http://localhost:3000${config.get('service.baseUrl')}`)
    .addServer(
      `https://thisisbac.herokuapp.com${config.get('service.baseUrl')}`,
    )
    .addSecurity('x-zp-auth-provider', {
      type: 'apiKey',
      name: 'x-zp-auth-provider',
      in: 'header',
      description: 'Auth Provider',
    })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options, {
    ignoreGlobalPrefix: true,
  });
  SwaggerModule.setup('docs/api', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      persistAuthorization: true,
    },
    customSiteTitle: config.get<string>('service.name'),
  });
}
