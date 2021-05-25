import { Inject, Injectable } from '@nestjs/common';
import { FindOptions, Sequelize } from 'sequelize';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { Hotel } from '../models/hotel.model';
import { Order } from '../models/order.model';
import { Op } from 'sequelize';
import { HotelResponse } from '../models/hotelResponse.model';
import { HotelResponseArrayDataDto, HotelResponseDto } from '../dto/hotelResponse.dto';
import { User } from '../models/user.model';

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

      // get all hotelResponsess
      const hotelResps = await this.hotelResponseModel.findAll({
        where: { hotelId: hotel.id },
        attributes: ['mark'],
        transaction
      });

      // count and save new rating
      hotel.rating =
        hotelResps.reduce((rat: number, hotelRes) => rat + hotelRes.mark, 0) / hotelResps.length;
      await hotel.save({ transaction });

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
      include: [User],
      limit: Number(limit),
      offset: Number(offset)
    } as FindOptions);

    return {
      data: response.rows,
      totalCount: response.count
    };
  }
}
