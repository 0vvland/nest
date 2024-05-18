import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users/users.service';
import { UserDto } from '../dto/user.dto';
import { JwtAuthGuardService } from '../services/authentication/jwt-auth.guard/jwt-auth.guard.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @UseGuards(JwtAuthGuardService)
  @Get()
  getUsers() {
    return this.userService.readAll();
  }

  @UseGuards(JwtAuthGuardService)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.readById(id);
  }

  @UseGuards(JwtAuthGuardService)
  @Post()
  createUser(@Body() data: UserDto) {
    return this.userService.create(data);
  }

  @UseGuards(JwtAuthGuardService)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() data: UserDto) {
    return this.userService.update(id, data);
  }

  @UseGuards(JwtAuthGuardService)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.userService.delete(id);
  }

  @Post('auth')
  auth(@Body() data: { login: string; password: string }) {
    return this.userService.auth(data.login, data.password);
  }

  @Post('registration')
  registration(@Body() data: UserDto) {
    return this.userService.register(data);
  }
}
