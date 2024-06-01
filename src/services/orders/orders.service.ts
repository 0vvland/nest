import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from '../../schemas/order';
import { Model } from 'mongoose';
import { OrderDto } from '../../dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async sendOrder(data: OrderDto) {
    const orderData = new this.orderModel(data);
    return orderData.save();
  }

  getAll(userId: string) {
    return this.orderModel.find({ userId });
  }
}
