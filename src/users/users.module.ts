import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user';
import { UsersService } from '../services/users/users.service';
import { AuthService } from '../services/authentication/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt';
import { JwtStrategyService } from '../services/authentication/jwt-strategy/jwt-strategy.service';
import { JwtAuthGuardService } from '../services/authentication/jwt-auth.guard/jwt-auth.guard.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, AuthService, JwtStrategyService],
})
export class UsersModule {}
