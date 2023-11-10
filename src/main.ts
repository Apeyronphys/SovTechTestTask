import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfig } from './config/swagger/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication')
  const port = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000

  SwaggerConfig(app)

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(port, () => {
    logger.log(`Server is running on port ${port}`)
  });
}
bootstrap();
