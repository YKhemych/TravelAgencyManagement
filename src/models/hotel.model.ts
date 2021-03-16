import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Address } from './address.model';
import { HotelImage } from './hotelImage.model';
import { Company } from './company.model';
import { Room } from './room.model';
import { Service } from './service.model';
import { HotelService } from './hotelService.model';

@Table
export class Hotel extends Model<Hotel> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column
  description: string;

  @Column
  phone: string;

  @Column({ defaultValue: 0 })
  rating: number;

  @ForeignKey(() => Address)
  @Column
  addressId: number;

  @BelongsTo(() => Address, { onDelete: 'SET NULL' })
  address: Address;

  @HasMany(() => HotelImage)
  hotelImages: HotelImage[];

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, { onDelete: 'SET NULL' })
  company: Company;

  @HasMany(() => Room)
  rooms: Room[];

  @BelongsToMany(() => Service, () => HotelService)
  services: Service[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
