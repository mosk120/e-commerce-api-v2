import { Injectable, Inject } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { User } from '../users/user.entity';
import { ORDER_REPOSITORY } from '../../core/constants';

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

  async findOne(id): Promise<Order> {
    return await this.orderRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.orderRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] = await this.orderRepository.update({ ...data }, { where: { id, userId }, returning: true });

    return { numberOfAffectedRows, updatedPost };
  }
}
