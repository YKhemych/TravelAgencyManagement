import * as bcrypt from 'bcryptjs';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
  UpdatedAt
} from 'sequelize-typescript';
import { FindOptions } from 'sequelize';
import { omit } from 'lodash';
import { Company } from './company.model';

export enum Roles {
  USER = 'user',
  OWNER = 'owner',
  ADMIN = 'admin'
}

@Table
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, allowNull: false })
  id: number;

  @Column({ allowNull: false, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Default(Roles.USER)
  @Column(DataType.ENUM(Roles.ADMIN, Roles.USER))
  role: Roles;

  @Column
  name: string;

  @Column
  surname: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company, { onDelete: 'SET NULL' }) company: Company;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BeforeCreate
  static hashPassword(instance: User) {
    instance.password = bcrypt.hashSync(instance.password, 10);
  }

  static async findByEmail(email: string, options?: FindOptions): Promise<User | null> {
    return User.findOne({ where: { email }, ...omit(options, ['where']) });
  }

  comparePasswords(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  static async changePassword(id: number, newPassword: string) {
    return User.update({ password: bcrypt.hashSync(newPassword, 10) }, { where: { id } });
  }

  isAdmin(): boolean {
    return this.role === Roles.ADMIN;
  }

  isUser(): boolean {
    return this.role === Roles.USER;
  }

  removePassword(): User {
    const notCircularObject = JSON.parse(JSON.stringify(this));
    notCircularObject.password = undefined;
    return notCircularObject;
  }
}
