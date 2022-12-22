// eslint-disable-next-line @typescript-eslint/no-var-requires

// require('dotenv').config();
require('../parse-env')();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'aws-sdk';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import Moralis from 'moralis';
import getLogLevels from './utils/getLogLevels';
import * as fs from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('./deploy/cert/redletter.me.key'),
  //   cert: fs.readFileSync('./deploy/cert/redletter.me.crt'),
  // };

  config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(process.env.NODE_ENV === 'production'),
    // httpsOptions,
    cors: true,
  });

  /* Swagger Module Setup */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Red Letter')
    .setDescription('RedLetter API description')
    .setVersion('1.0')
    .addTag('redletter')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
  /* */

  /* Moralis Setup */
  Moralis.start({
    apiKey: process.env.MORALIS_API_KEY,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  // Global Prefix
  app.setGlobalPrefix('api');
  await app.listen(process.env.NODE_BACKEND_PORT);
}
bootstrap();
