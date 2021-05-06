import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { config } from './config/config';
// import { ExceptionHandler } from './config/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      // forbidUnknownValues: true,
      // forbidNonWhitelisted: true
    })
  );
  // app.useGlobalFilters(new ExceptionHandler());

  const options = new DocumentBuilder()
    .setTitle('Travel agency API')
    .setDescription('Travel agency backend API documentation')
    .setVersion('1.0.0')
    .setBasePath('/')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.SERVER_PORT);
}
bootstrap();
