import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  })
  gender: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false
  })
  isAdmin: boolean

  // @HasMany(() => Cart)
  // cart: Cart[]
}