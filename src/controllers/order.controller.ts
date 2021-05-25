import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { Body } from '@nestjs/common';
import { InstanceDoesNotExist } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { config } from '../config/config';
import { OrderArrayDataDto, OrderDataDto } from '../dto/order.dto';
import { OrderService } from '../services/order.service';

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('Order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('')
  @ApiCreatedResponse({
    type: OrderDataDto,
    description: 'Order successfully created'
  })
  async createOrder(
    @Body() orderDataDto: OrderDataDto,
    @UserId() userId: number
  ): Promise<OrderDataDto> {
    try {
      const order = await this.orderService.createOrder(orderDataDto.data, userId);

      return { data: order };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Put('')
  @ApiCreatedResponse({
    type: OrderDataDto,
    description: 'Order successfully updated'
  })
  async updateOrder(
    @Body() orderDataDto: OrderDataDto,
    @UserId() userId: number
  ): Promise<OrderDataDto> {
    try {
      const order = await this.orderService.updateOrder(orderDataDto.data, userId);

      return { data: order };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Get('')
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'offset', required: false })
  @ApiOkResponse({
    type: OrderArrayDataDto,
    description: 'Get orders'
  })
  async getOrders(
    @UserId() userId: number,
    @Query('limit') limit = config.DEFAULT_LIMIT,
    @Query('offset') offset = 0
  ): Promise<OrderArrayDataDto> {
    try {
      const orders = await this.orderService.getOrders(userId, limit, offset);

      return orders;
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Get('/:orderId')
  @ApiOkResponse({
    type: OrderDataDto,
    description: 'Get order by id'
  })
  async getOrder(
    @UserId() userId: number,
    @Param('orderId') orderId: number
  ): Promise<OrderDataDto> {
    try {
      const order = await this.orderService.getOrder(orderId, userId);

      return { data: order };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }
}
