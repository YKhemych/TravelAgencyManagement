import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Room } from './room.model';
import { Order } from './order.model';
import { Service } from './service.model';
import { OrderRoomService } from './orderRoomService.model';

@Table
export class OrderRoom extends Model<OrderRoom> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Order)
  @Column({ allowNull: false })
  orderId: number;

  @ForeignKey(() => Room)
  @Column({ allowNull: false })
  roomId: number;

  @BelongsTo(() => Room, { onDelete: 'CASCADE' }) room: Room;

  @BelongsToMany(() => Service, () => OrderRoomService)
  services: Service[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
