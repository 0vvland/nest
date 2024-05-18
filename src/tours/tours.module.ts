import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt';
import { AuthService } from '../services/authentication/auth/auth.service';
import { JwtStrategyService } from '../services/authentication/jwt-strategy/jwt-strategy.service';
import { Tour, TourSchema } from '../schemas/tour';
import { ToursController } from './tours.controller';
import { ToursService } from '../services/tours/tours.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tour.name, schema: TourSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ToursController],
  providers: [ToursService, JwtStrategyService],
})
export class ToursModule {}
