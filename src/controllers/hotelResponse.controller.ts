import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { Body } from '@nestjs/common';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { config } from '../config/config';
import { HotelResponseService } from '../services/hotelResponse.service';
import { HotelResponseArrayDataDto, HotelResponseDataDto } from '../dto/hotelResponse.dto';

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('Hotel response')
@Controller('hotelResponse')
export class HotelResponseController {
  constructor(private readonly hotelResponseService: HotelResponseService) {}

  @Post('')
  @ApiCreatedResponse({
    type: HotelResponseDataDto,
    description: 'Hotel response successfully created'
  })
  async createHotel(
    @Body() hotelResponseDataDto: HotelResponseDataDto,
    @UserId() userId: number
  ): Promise<HotelResponseDataDto> {
    try {
      const hotel = await this.hotelResponseService.createHotelResponse(
        hotelResponseDataDto.data,
        userId
      );

      return { data: hotel };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        case YouDoNotHaveAccessToInstanceError:
          throw new ForbiddenException(errorMessages.YOU_DO_NOT_HAVE_ACCESS_TO_INSTANCE);
        default:
          throw err;
      }
    }
  }

  @Get('/:hotelId')
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'offset', required: false })
  @ApiOkResponse({
    type: HotelResponseArrayDataDto,
    description: 'Get responses for hotel'
  })
  async getHotels(
    @Param('hotelId') hotelId: number,
    @Query('limit') limit = config.DEFAULT_LIMIT,
    @Query('offset') offset = 0
  ): Promise<HotelResponseArrayDataDto> {
    return this.hotelResponseService.getHotelResponses(hotelId, limit, offset);
  }
}
