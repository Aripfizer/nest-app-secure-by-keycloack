import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config$: ConfigService) => {
        return new Promise((resolve, reject) => {
          resolve({
            authServerUrl: config$.getOrThrow('KEYCLOAK_URL'),
            realm: config$.getOrThrow('KEYCLOAK_REALM'),
            clientId: config$.getOrThrow('KEYCLOAK_CLIENT'),
            secret: config$.getOrThrow('KEYCLOAK_SECRET'),
            useNestLogger: true,
          });
        });
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: ResourceGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule { }
