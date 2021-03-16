import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { Hotel } from './hotel.model';
import { Service } from './service.model';
import { RoomService } from './roomService.model';

export enum RoomTypeEnum {
  SUPER_LUX = 'super_lux',
  LUX = 'lux',
  COMFORT = 'comfort',
  STANDARD = 'standard',
  ECONOMY = 'economy',
  BED = 'bed'
}

@Table
export class Room extends Model<Room> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  name: string;

  @Column
  description: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(
      RoomTypeEnum.SUPER_LUX,
      RoomTypeEnum.LUX,
      RoomTypeEnum.COMFORT,
      RoomTypeEnum.STANDARD,
      RoomTypeEnum.ECONOMY,
      RoomTypeEnum.BED
    )
  })
  roomType: RoomTypeEnum;

  @Column({ allowNull: false })
  roomCapacity: number;

  @Column({ allowNull: false })
  pricePerDay: number;

  @BelongsToMany(() => Service, () => RoomService)
  defaultServices: Service[];

  @ForeignKey(() => Hotel)
  @Column({ allowNull: false })
  hotelId: number;

  @BelongsTo(() => Hotel, { onDelete: 'CASCADE' }) hotel: Hotel;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
