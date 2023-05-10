import { Logger, NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from 'prisma/prisma.service';

async function bootstrap() {
  const logger = new Logger();

  const nestAppOpt: NestApplicationOptions = {
    logger: logger,
  };
  const app = await NestFactory.create(AppModule, { rawBody: true, ...nestAppOpt});

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}
bootstrap();
