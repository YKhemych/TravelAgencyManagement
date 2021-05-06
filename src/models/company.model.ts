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
import { Address } from './address.model';
import { Hotel } from './hotel.model';

@Table
export class Company extends Model<Company> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false, unique: true })
  name: string;

  @Column({ allowNull: false, defaultValue: false })
  isActive: boolean;

  @ForeignKey(() => Address)
  @Column
  addressId: number;

  @BelongsTo(() => Address, { onDelete: 'SET NULL' }) address: Address;

  @HasMany(() => Hotel)
  hotels: Hotel[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
