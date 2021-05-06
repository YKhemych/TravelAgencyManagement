import { Column, CreatedAt, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Hotel } from './hotel.model';

@Table({
  updatedAt: false
})
export class HotelImage extends Model<HotelImage> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column
  imagePath: string;

  @ForeignKey(() => Hotel)
  @Column
  hotelId: number;

  @CreatedAt
  createdAt: Date;
}
