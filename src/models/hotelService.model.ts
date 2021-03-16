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

@Table
export class HotelService extends Model<HotelService> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @ForeignKey(() => Hotel)
  @Column({ allowNull: false })
  hotelId: number;

  @ForeignKey(() => Service)
  @Column({ allowNull: false })
  serviceId: number;

  @BelongsTo(() => Service, { onDelete: 'CASCADE' })
  service: Service;

  @Column({ allowNull: false, defaultValue: 0 })
  pricePerDay: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
