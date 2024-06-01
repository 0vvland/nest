import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt';
import { JwtStrategyService } from '../services/authentication/jwt-strategy/jwt-strategy.service';
import { Order, OrderSchema } from '../schemas/order';
import { OrdersService } from '../services/orders/orders.service';
import { ToursService } from '../services/tours/tours.service';
import { Tour, TourSchema } from '../schemas/tour';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Tour.name, schema: TourSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategyService, OrdersService, ToursService],
  controllers: [OrdersController],
})
export class OrdersModule {}
