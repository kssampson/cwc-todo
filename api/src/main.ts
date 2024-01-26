import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from '../db';
import "reflect-metadata"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));
  app.enableCors();
  await AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  await app.listen(3001);
}
bootstrap();