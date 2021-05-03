import { BadRequestException, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { Body } from '@nestjs/common';
import { InstanceDoesNotExist } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { HotelService } from "../services/hotel.service";
import { HotelArrayDataDto, HotelDataDto } from "../dto/hotel.dto";
import { ApiImplicitQuery } from "@nestjs/swagger/dist/decorators/api-implicit-query.decorator";
import { config } from "../config/config";

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('Hotel')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post('')
  @ApiCreatedResponse({
    type: HotelDataDto,
    description: 'Hotel successfully created'
  })
  async createHotel(
    @Body() hotelDataDto: HotelDataDto,
    @UserId() userId: number
  ): Promise<HotelDataDto> {
    try {
      const hotel = await this.hotelService.createHotel(hotelDataDto.data, userId);

      return { data: hotel };
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
    type: HotelArrayDataDto,
    description: 'Get hotels'
  })
  async getHotels(
    @Query('limit') limit = config.DEFAULT_LIMIT,
    @Query('offset') offset = 0
  ): Promise<HotelArrayDataDto> {
    const company = await this.hotelService.getHotels(limit, offset);

    return { data: company };
  }

  @Get('/user')
  @ApiOkResponse({
    type: HotelArrayDataDto,
    description: 'Get hotels'
  })
  async getUser(@UserId() userId: number): Promise<HotelArrayDataDto> {
    const company = await this.hotelService.getHotelsForUser(userId);

    return { data: company };
  }
}
