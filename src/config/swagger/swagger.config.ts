import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfig(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('SovcomTech Test')
    .setDescription('Запросы тестового приложения')
    .setVersion('1.0')
    .addServer(`${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`)
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup(`/docs`, app, document);
}
