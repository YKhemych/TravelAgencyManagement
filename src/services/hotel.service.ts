import { Inject, Injectable } from '@nestjs/common';
import { FindOptions, Sequelize } from 'sequelize';
import { User } from '../models/user.model';
import {InstanceAlreadyExist, InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError} from '../classes/errors.class';
import { AddressService } from './address.service';
import { Company } from '../models/company.model';
import { Address } from '../models/address.model';
import { Location } from '../models/location.model';
import { Hotel } from '../models/hotel.model';
import {HotelArrayDataDto, HotelDto, HotelImageDto} from '../dto/hotel.dto';
import { Room } from '../models/room.model';
import { HotelImage } from '../models/hotelImage.model';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class HotelService {
  constructor(
    private readonly addressService: AddressService,
    @Inject('HotelModel') private readonly hotelModel: typeof Hotel,
    @Inject('HotelImageModel') private readonly hotelImageModel: typeof HotelImage,
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async getHotelsForUser(userId: number, limit: number, offset: number): Promise<HotelArrayDataDto> {
    // get user with company
    const user = await this.userModel.findByPk(userId);

    // check company existing
    if (!user!.companyId) {
      throw new InstanceDoesNotExist('Company');
    }

    const hotels = await this.hotelModel.findAll({
      where: { companyId: user!.companyId },
      include: [
        HotelImage,
        {
          model: Address,
          include: [Location]
        }
      ],
      order: [['updatedAt', 'DESC']],
      limit: Number(limit),
      offset: Number(offset)
    } as FindOptions);

    const count = await this.hotelModel.count({
      where: { companyId: user!.companyId }
    })

    return {
      data: hotels,
      totalCount: count
    };
  }

  async getHotels(limit: number, offset: number): Promise<HotelArrayDataDto> {
    const hotels = await this.hotelModel.findAll({
      include: [
        HotelImage,
        {
          model: Address,
          include: [Location]
        }
      ],
      order: [['rating', 'DESC']],
      limit: Number(limit),
      offset: Number(offset)
    } as FindOptions);

    const count = await this.hotelModel.count();

    return {
      data: hotels,
      totalCount: count
    };
  }

  async getHotel(id: number): Promise<HotelDto> {
    const hotel = await this.hotelModel.findByPk(id, {
      include: [
        HotelImage,
        {
          model: Address,
          include: [Location]
        },
        Room,
        HotelImage
      ]
    } as FindOptions);

    // check company existing
    if (!hotel) {
      throw new InstanceDoesNotExist('Hotel');
    }

    return hotel;
  }

  async createHotel(hotelDto: HotelDto, userId: number): Promise<HotelDto> {
    const transaction = await this.sequelize.transaction();

    try {
      // get user and check company existing
      const user = await this.userModel.findByPk(userId, { transaction });

      if (!user!.companyId) {
        throw new InstanceDoesNotExist('Company');
      }

      const existedHotel = await this.hotelModel.findOne({
        where: {
          name: hotelDto.name,
          companyId: user!.companyId
        }
      });

      if (existedHotel) {
        throw new InstanceAlreadyExist('Hotel');
      }

      // create address
      const address = await this.addressService.createAddress(hotelDto.address, transaction);

      // todo add checking hotel name and phone

      const hotel = await this.hotelModel.create(
        {
          name: hotelDto.name,
          description: hotelDto.description,
          phone: hotelDto.phone,
          addressId: address.id,
          companyId: user!.companyId
        } as Hotel,
        { transaction }
      );

      await transaction.commit();

      return hotel;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  async createHotelImages(
    files: Array<Express.Multer.File>,
    hotelId: number,
    userId: number
  ): Promise<HotelImageDto[]> {
    const transaction = await this.sequelize.transaction();

    try {
      // get user and hotel and check hotel existing and access
      const user = await this.userModel.findByPk(userId, { transaction });

      const hotel = await this.hotelModel.findByPk(hotelId, { transaction });

      if (!hotel) {
        throw new InstanceDoesNotExist('Hotel');
      }

      if (user!.companyId !== hotel!.companyId) {
        throw new YouDoNotHaveAccessToInstanceError('Company');
      }

      // mode images to dto and save
      const hotelImagesDto = files.map(
        (file: Express.Multer.File): HotelImageDto => ({
          imagePath: String(file.filename),
          hotelId: Number(hotelId)
        })
      );

      const hotelImages = await this.hotelImageModel.bulkCreate(hotelImagesDto as HotelImage[], {
        transaction
      });

      await transaction.commit();

      return hotelImages;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  async deleteHotelImage(id: number, userId: number): Promise<HotelImageDto> {
    const user = await this.userModel.findByPk(userId);

    const imageToRemove = await this.hotelImageModel.findByPk(id);

    if (!imageToRemove) {
      throw new InstanceDoesNotExist('Hotel image');
    }

    const hotel = await this.hotelModel.findByPk(imageToRemove!.hotelId);

    if (!hotel) {
      throw new InstanceDoesNotExist('Hotel');
    }

    if (user!.companyId !== hotel!.companyId) {
      throw new YouDoNotHaveAccessToInstanceError('Company');
    }

    fs.unlinkSync(join(__dirname, '..', '..', 'images', imageToRemove.imagePath));

    await imageToRemove.destroy();

    return imageToRemove;
  }
}
