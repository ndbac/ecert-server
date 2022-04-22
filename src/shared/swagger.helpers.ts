import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function initializeSwaggerDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('ThisIsBac APIs Documentation')
    .setDescription('API specification for ThisIsBac blog')
    .setVersion(process.env.API_VERSION)
    .addSecurity('x-zp-auth-provider', {
      type: 'apiKey',
      name: 'x-zp-auth-provider',
      in: 'header',
      description: 'Auth Provider',
    })
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs/api', app, document, {
    swaggerOptions: {
      displayOperationId: true,
      persistAuthorization: true,
    },
    customSiteTitle: 'ThisIsBac Blog APIs',
  });
}
