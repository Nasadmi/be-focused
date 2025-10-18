import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaFilter } from './prisma/prisma.filter';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOption: CorsOptions = {
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  origin: (o, cb) => {
    const whitelist = process.env.WHITELIST;

    if (!whitelist) {
      cb(null, true);
      return;
    }

    const allowed = whitelist.split(',');
    if (!allowed.includes(o)) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  app.enableCors(corsOption);
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
