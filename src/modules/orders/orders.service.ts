import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { User } from '../users/user.entity';
import { ORDER_REPOSITORY } from '../../core/constants';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(@Inject(ORDER_REPOSITORY) private readonly orderRepository: typeof Order) { }

  async create(order: OrderDto, userId): Promise<Order> {
    return await this.orderRepository.create<Order>({ ...order, userId });
  }

  async findUserOrders(id: number): Promise<Order[]> {
    return await this.orderRepository.findAll<Order>({
      where: {
        userId: id
      }
    });
  }

  async findOrdersWithProducts(): Promise<Order[]> {
    return await this.orderRepository.findAll<Order>({
      include: [Product]
    });
  }

  async findOne(id): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id) {
    return await this.orderRepository.destroy({ where: { id } });
  }

  async update(id, data) {
    const order = await this.orderRepository.findByPk(id)
    if (!order) {
      throw new NotFoundException('This Order doesn\'t exist');
    }
    return await (order).update(data);
  }
}
