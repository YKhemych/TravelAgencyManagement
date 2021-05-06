import { Inject, Injectable } from '@nestjs/common';
import {FindOptions, Sequelize} from 'sequelize';
import { User } from '../models/user.model';
import {InstanceAlreadyExist, InstanceDoesNotExist, ModelWithFieldAlreadyExist} from '../classes/errors.class';
import { AddressService } from './address.service';
import { CompanyDto } from '../dto/company.dto';
import { Company } from '../models/company.model';
import {Address} from "../models/address.model";
import {Location} from "../models/location.model";

@Injectable()
export class CompanyService {
  constructor(
    private readonly addressService: AddressService,
    @Inject('CompanyModel') private readonly companyModel: typeof Company,
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async getCompany(userId: number): Promise<CompanyDto> {
    // get user with company
    const user = await this.userModel.findByPk(
      userId,
      {
        include: [
          {
            model: Company,
            include: [
              {
                model: Address,
                include: [Location]
              }
            ]
          }
        ]
      } as FindOptions
    );

    // check company existing
    if (!user!.companyId) {
      throw new InstanceDoesNotExist('Company');
    }

    return user!.company;
  }

  async createCompany(companyDto: CompanyDto, userId: number): Promise<CompanyDto> {
    const transaction = await this.sequelize.transaction();

    try {
      // get user and check company existing
      const user = await this.userModel.findByPk(userId, { transaction });

      if (user!.companyId) {
        throw new InstanceAlreadyExist('Company');
      }

      // check company name existing
      const companyWithName = await this.companyModel.findOne({
        where: {
          name: companyDto.name
        },
        transaction
      });

      if (companyWithName) {
        throw new ModelWithFieldAlreadyExist('Company', 'such name');
      }

      // create address
      const address = await this.addressService.createAddress(companyDto.address, transaction);

      const company = await this.companyModel.create(
        {
          email: companyDto.email,
          name: companyDto.name,
          addressId: address.id,
          isActive: true // todo Change to false after adding email sending
        } as Company,
        { transaction }
      );

      user!.companyId = company.id;
      await user!.save({ transaction });

      await transaction.commit();

      return company;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
