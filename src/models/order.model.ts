import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Hotel } from './hotel.model';
import { User } from './user.model';
import { OrderRoom } from './orderRoom.model';

@Table
export class Order extends Model<Order> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  price: number;

  @Column
  description: string;

  @Column({ allowNull: false })
  startTime: Date;

  @Column({ allowNull: false })
  endTime: Date;

  @Column({ allowNull: false, defaultValue: false })
  isAccepted: boolean;

  @Column({ allowNull: false, defaultValue: false })
  isExecuted: boolean;

  @Column({ allowNull: false, defaultValue: false })
  isPaid: boolean;

  @ForeignKey(() => User)
  @Column({ allowNull: false })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ForeignKey(() => Hotel)
  @Column({ allowNull: false })
  hotelId: number;

  @BelongsTo(() => Hotel, { onDelete: 'CASCADE' })
  hotel: Hotel;

  @HasMany(() => OrderRoom)
  roomsWithServices: OrderRoom[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
