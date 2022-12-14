import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Table
export class Post extends Model<Post> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  total: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

  @HasMany(() => Product)
  products: Product[]
}