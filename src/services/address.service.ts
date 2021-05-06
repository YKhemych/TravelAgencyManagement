import { Inject, Injectable } from '@nestjs/common';
import { Transaction } from 'sequelize';
import { Address } from '../models/address.model';
import { Location } from '../models/location.model';
import { AddressDto } from '../dto/address.dto';

@Injectable()
export class AddressService {
  constructor(
    @Inject('AddressModel') private readonly addressModel: typeof Address,
    @Inject('LocationModel') private readonly locationModel: typeof Location
  ) {}

  async createAddress(addressDto: AddressDto, transaction: Transaction): Promise<AddressDto> {
    // create location
    const location = await this.locationModel.create(addressDto.location as Location, {
      transaction
    });

    // create address
    const address = await this.addressModel.create(
      {
        locationId: location.id,
        ...addressDto
      } as Address,
      {
        transaction
      }
    );

    return address;
  }
}
