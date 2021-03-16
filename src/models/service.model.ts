import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Address } from './address.model';
import { HotelImage } from './hotelImage.model';
import { Company } from './company.model';
import { Roles } from './user.model';
import { Hotel } from './hotel.model';
import { ServiceCategory } from './serviceCategory.model';

@Table
export class Service extends Model<Service> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column
  description: string;

  @ForeignKey(() => ServiceCategory)
  @Column
  categoryId: number;

  @BelongsTo(() => ServiceCategory, { onDelete: 'SET NULL' }) category: ServiceCategory;

  @ForeignKey(() => Hotel)
  @Column({ allowNull: true })
  hotelId: number;

  @BelongsTo(() => Hotel, { onDelete: 'CASCADE' }) hotel: Hotel;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
