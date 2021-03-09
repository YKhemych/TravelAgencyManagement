import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table
export class Location extends Model<Location> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column(DataType.DOUBLE)
  latitude: number;

  @Column(DataType.DOUBLE)
  longitude: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
