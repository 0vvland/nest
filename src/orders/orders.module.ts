import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../constants/jwt';
import { JwtStrategyService } from '../services/authentication/jwt-strategy/jwt-strategy.service';
import { Order, OrderSchema } from '../schemas/order';
import { OrdersService } from '../services/orders/orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [JwtStrategyService, OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
