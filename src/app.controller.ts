import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedUser, Roles } from 'nest-keycloak-connect';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Roles({ roles: ['user'] })
  getHello(
    @AuthenticatedUser() user: {sub: string}
  ): string {
    console.log("UserId : ", user)
    return this.appService.getHello();
  }
}
