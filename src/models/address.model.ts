import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Location } from './location.model';

@Table
export class Address extends Model<Address> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  country: string;

  @Column({ allowNull: false })
  city: string;

  @Column({ allowNull: false })
  street: string;

  @Column
  state: string;

  @Column
  zip: string;

  @ForeignKey(() => Location)
  @Column({ allowNull: true, type: DataType.INTEGER })
  locationId: number | null;

  @BelongsTo(() => Location, { onDelete: 'SET NULL' }) location: Location;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
