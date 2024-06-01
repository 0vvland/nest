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
import { ToursService } from '../services/tours/tours.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private orderService: OrdersService,
    private tourService: ToursService,
  ) {}

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
  async getAll(@Request() req: any) {
    const tours = await this.tourService.getAll();
    const orders = await this.orderService.getAll(req.user.userId);

    const ret = orders.map((order) => {
      const obj: any = order.toObject();
      const tour = tours.find(({ _id }) => obj.tourId === _id.toString());

      if (tour) {
        obj.tour = tour.toObject();
      }
      return obj;
    });
    return ret;
  }
}
