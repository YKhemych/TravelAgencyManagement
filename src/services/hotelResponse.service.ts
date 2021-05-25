import { Inject, Injectable } from '@nestjs/common';
import { FindOptions, Sequelize } from 'sequelize';
import { Roles, User } from '../models/user.model';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { OrderArrayDataDto, OrderDto } from '../dto/order.dto';
import { Order } from '../models/order.model';
import { OrderRoom } from '../models/orderRoom.model';
import { Op } from 'sequelize';
import { omit } from 'lodash';
import { HotelResponse } from '../models/hotelResponse.model';
import {
  HotelResponseArrayDataDto,
  HotelResponseDataDto,
  HotelResponseDto
} from '../dto/hotelResponse.dto';

@Injectable()
export class HotelResponseService {
  constructor(
    @Inject('HotelResponseModel') private readonly hotelResponseModel: typeof HotelResponse,
    @Inject('HotelModel') private readonly hotelModel: typeof Hotel,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async createHotelResponse(
    hotelResponseDto: HotelResponseDto,
    userId: number
  ): Promise<HotelResponseDto> {
    const transaction = await this.sequelize.transaction();

    try {
      const hotel = await this.hotelModel.findByPk(hotelResponseDto.hotelId, {
        include: [
          {
            model: Order,
            where: { isExecuted: true }
          }
        ],
        transaction
      } as FindOptions);

      if (!hotel) {
        throw new InstanceDoesNotExist('Hotel');
      }

      const accessToWriteResponse = hotel.orders.some((order) => order.userId === userId);

      if (!accessToWriteResponse) {
        throw new YouDoNotHaveAccessToInstanceError('Hotel response');
      }

      // create hotel response
      const hotelResponse = await this.hotelResponseModel.create(
        {
          ...hotelResponseDto,
          isActive: true, // TODO add validation by admin
          userId
        } as HotelResponse,
        { transaction }
      );

      await transaction.commit();

      return hotelResponse;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  async getHotelResponses(
    hotelId: number,
    limit: number,
    offset: number
  ): Promise<HotelResponseArrayDataDto> {
    const response = await this.hotelResponseModel.findAndCountAll({
      where: {
        hotelId,
        deletedAt: { [Op.eq]: null }
      },
      limit: Number(limit),
      offset: Number(offset)
    });

    return {
      data: response.rows,
      totalCount: response.count
    };
  }
}
