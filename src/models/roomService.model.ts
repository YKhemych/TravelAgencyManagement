import {
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Hotel } from './hotel.model';
import { Service } from './service.model';
import { Room } from './room.model';

@Table
export class RoomService extends Model<RoomService> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Room)
  @Column({ allowNull: false })
  roomId: number;

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
