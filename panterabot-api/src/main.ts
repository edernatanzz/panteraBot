import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilita validação de DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Habilita CORS
  app.enableCors();

  // Prefixo para todas as rotas da API
  app.setGlobalPrefix('api');

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
