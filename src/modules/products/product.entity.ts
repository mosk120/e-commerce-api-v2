import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';
// import { Cart } from '../carts/cart.entity';

@Table
export class Product extends Model<Product> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  img: string;
  //
  // @ForeignKey(() => Order)
  // @Column
  // orderId: number;
  //
  // @BelongsTo(() => Order)
  // order: Order;
  //
  // @ForeignKey(() => Order)
  // @Column
  // cartId: number;
  //
  // @BelongsTo(() => Cart)
  // cart: Cart;
}