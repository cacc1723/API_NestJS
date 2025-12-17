import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    const myVar = this.configService.get('MY_VAR', { infer: true });
    console.log('MY_VAR:', myVar);
    return this.appService.getHello();
  }

  @Get('my-test')
  getMyTest() {
    return this.usersService.findAll();
  }
}
