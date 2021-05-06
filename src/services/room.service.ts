import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { User } from '../models/user.model';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { Company } from '../models/company.model';
import { Hotel } from "../models/hotel.model";
import { Room } from "../models/room.model";
import { RoomDto } from "../dto/room.dto";

@Injectable()
export class RoomService {
  constructor(
    @Inject('RoomModel') private readonly roomModel: typeof Room,
    @Inject('HotelModel') private readonly hotelModel: typeof Hotel,
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async createRoom(roomDto: RoomDto, userId: number): Promise<RoomDto> {
    const transaction = await this.sequelize.transaction();

    try {
      // get user and check company existing
      const user = await this.userModel.findByPk(userId, { transaction });

      const hotel = await this.hotelModel.findByPk(roomDto.hotelId, { transaction });

      if (!hotel) {
        throw new InstanceDoesNotExist('Hotel');
      }

      if (user!.companyId !== hotel!.companyId) {
        throw new YouDoNotHaveAccessToInstanceError('Company');
      }

      // create address
      const room = await this.roomModel.create({ ...roomDto} as Room, { transaction });

      await transaction.commit();

      return room;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
