import { Inject, Injectable } from '@nestjs/common';
import { FindOptions, Sequelize } from 'sequelize';
import { Roles, User } from '../models/user.model';
import { InstanceDoesNotExist } from '../classes/errors.class';
import { Hotel } from '../models/hotel.model';
import { Room } from '../models/room.model';
import { OrderDto } from '../dto/order.dto';
import { Order } from '../models/order.model';
import { OrderRoom } from '../models/orderRoom.model';
import { Op } from 'sequelize';

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderModel') private readonly orderModel: typeof Order,
    @Inject('OrderRoomModel') private readonly orderRoomModel: typeof OrderRoom,
    @Inject('RoomModel') private readonly roomModel: typeof Room,
    @Inject('HotelModel') private readonly hotelModel: typeof Hotel,
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize
  ) {}

  async createOrder(orderDto: OrderDto, userId: number): Promise<OrderDto> {
    const transaction = await this.sequelize.transaction();

    try {
      const hotel = await this.hotelModel.findByPk(orderDto.hotelId, {
        include: [
          {
            model: Room,
            attributes: ['id']
          }
        ],
        transaction
      } as FindOptions);

      if (!hotel) {
        throw new InstanceDoesNotExist('Hotel');
      }

      const filteredRooms = orderDto.roomIds!.filter((roomId: number) => {
        return !!hotel.rooms.find((room) => room.id === roomId);
      });

      if (filteredRooms.length === 0) {
        throw new InstanceDoesNotExist('Rooms');
      }

      // create order
      const order = await this.orderModel.create(
        {
          ...orderDto,
          userId,
          isAccepted: false,
          isExecuted: false,
          isPaid: false
        } as Order,
        { transaction }
      );

      const orderRoomsDto = filteredRooms.map(
        (roomId) =>
          ({
            roomId,
            orderId: order.id
          } as OrderRoom)
      );

      // create room - order relation
      order.orderRooms = await this.orderRoomModel.bulkCreate(orderRoomsDto, { transaction });

      await transaction.commit();

      return order;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  async getOrders(userId: number, limit: number, offset: number): Promise<OrderDto[]> {
    // get user
    const user = await this.userModel.findByPk(userId);

    let orders: Order[] = [];

    switch (user!.role) {
      case Roles.USER:
        orders = await this.orderModel.findAll({
          where: {
            userId
          },
          include: [Room, Hotel],
          order: [['createdAt', 'DESC']],
          limit: Number(limit),
          offset: Number(offset)
        } as FindOptions);
        break;
      case Roles.OWNER:
        if (!user!.companyId) {
          throw new InstanceDoesNotExist('Company');
        }

        const hotelIds = await this.hotelModel
          .findAll({
            where: {
              companyId: user!.companyId
            }
          })
          .then((hotels) => hotels.map((hotel) => hotel.id));

        orders = await this.orderModel.findAll({
          where: {
            hotelId: { [Op.in]: hotelIds }
          },
          include: [Room, Hotel],
          order: [['createdAt', 'DESC']],
          limit: Number(limit),
          offset: Number(offset)
        } as FindOptions);
        break;
      default:
        orders = await this.orderModel.findAll({
          include: [Room, Hotel],
          order: [['createdAt', 'DESC']],
          limit: Number(limit),
          offset: Number(offset)
        } as FindOptions);
    }

    return orders;
  }

  async getOrder(id: number, userId: number): Promise<OrderDto> {
    // get user
    const user = await this.userModel.findByPk(userId);

    console.log(id);

    console.log(JSON.stringify(user, null, 2));

    let order: Order | null;

    switch (user!.role) {
      case Roles.USER:
        order = await this.orderModel.findByPk(id, {
          where: {
            userId
          },
          include: [Room, Hotel]
        } as FindOptions);
        break;
      case Roles.OWNER:
        if (!user!.companyId) {
          throw new InstanceDoesNotExist('Company');
        }

        const hotelIds = await this.hotelModel
          .findAll({
            where: {
              companyId: user!.companyId
            }
          })
          .then((hotels) => hotels.map((hotel) => hotel.id));

        order = await this.orderModel.findByPk(id, {
          where: {
            hotelId: { [Op.in]: hotelIds }
          },
          include: [Room, Hotel]
        } as FindOptions);
        break;
      default:
        order = await this.orderModel.findByPk(id, {
          include: [Room, Hotel]
        } as FindOptions);
    }

    console.log(JSON.stringify(order, null, 2));

    if (!order) {
      throw new InstanceDoesNotExist('Order');
    }

    return order;
  }
}
