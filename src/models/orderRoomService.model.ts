import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Service } from './service.model';
import { OrderRoom } from './orderRoom.model';

@Table
export class OrderRoomService extends Model<OrderRoomService> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => OrderRoom)
  @Column({ allowNull: false })
  orderRoomId: number;

  @ForeignKey(() => Service)
  @Column({ allowNull: false })
  serviceId: number;

  @BelongsTo(() => Service, { onDelete: 'CASCADE' })
  service: Service;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
