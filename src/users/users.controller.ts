import {Controller, Get, Param} from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'working';
  }

  @Get(":id")
  getUser(@Param() param): string {
    return 'working' + param.id;
  }
}
