import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super({ usernameField: 'login', passwordField: 'password' });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.userService.checkAuthUser(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
