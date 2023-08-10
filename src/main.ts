import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { setApp } from './@core/app';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  const configSvc: ConfigService = app.get(ConfigService);

  app.enableCors({ origin: configSvc.getOrThrow('ALLOWED_ORIGIN') });

  await app.listen(configSvc.get<number>('API_PORT') || 3000);
  logger.log(`Api has started on ${configSvc.get<number>('API_PORT') || 3000}`);

  setApp(app);
}

bootstrap();
