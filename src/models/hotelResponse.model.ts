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
import { User } from './user.model';

@Table
export class HotelResponse extends Model<HotelResponse> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false })
  mark: number;

  @Column
  description: string;

  @Column({ allowNull: false, defaultValue: true })
  isActive: boolean;

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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @Column
  deletedAt: Date;
}
