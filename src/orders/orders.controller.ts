import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { OrdersService } from '../services/orders/orders.service';
import { OrderDto } from '../dto/order.dto';
import { JwtAuthGuardService } from '../services/authentication/jwt-auth.guard/jwt-auth.guard.service';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @UseGuards(JwtAuthGuardService)
  @Post()
  initOrder(@Body() data: OrderDto, @Request() req: any) {
    const orderData = new OrderDto(
      data.age,
      data.birthDay,
      data.cardNumber,
      data.tourId,
      req.user.userId,
    );
    this.orderService.sendOrder(orderData);
  }

  @UseGuards(JwtAuthGuardService)
  @Get()
  getAll() {
    return this.orderService.getAll();
  }
}
