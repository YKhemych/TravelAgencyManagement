import { Column, CreatedAt, Model, Table } from 'sequelize-typescript';

@Table
export class BlackmailedToken extends Model<BlackmailedToken> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ unique: true, allowNull: false })
  token: string;

  @CreatedAt
  createdAt: Date;
}
