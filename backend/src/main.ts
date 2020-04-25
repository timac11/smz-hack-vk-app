import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cors = require('@koa/cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
