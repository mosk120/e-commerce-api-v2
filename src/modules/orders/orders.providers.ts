import { Order } from './order.entity';
import { ORDER_REPOSITORY } from '../../core/constants';

export const ordersProviders = [{
  provide: ORDER_REPOSITORY,
  useValue: Order,
}];