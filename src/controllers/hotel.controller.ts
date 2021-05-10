import {
  BadRequestException,
  Controller,
  ForbiddenException,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { Body } from '@nestjs/common';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { HotelService } from '../services/hotel.service';
import { HotelArrayDataDto, HotelDataDto, HotelImageArrayDataDto } from '../dto/hotel.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { config } from '../config/config';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as uuid from 'uuid';

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
    try {
      const company = await this.hotelService.getHotelsForUser(userId);

      return { data: company };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Get('/:hotelId')
  @ApiOkResponse({
    type: HotelDataDto,
    description: 'Get hotel by id'
  })
  async getHotel(@Param('hotelId') hotelId: number): Promise<HotelDataDto> {
    try {
      const company = await this.hotelService.getHotel(hotelId);

      return { data: company };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Post('image/:hotelId')
  @ApiImplicitFile({ name: 'images', required: true })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Images uploaded success' })
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const filename = `${uuid.v4()}_${file.originalname.replace(/ +?/g, '_')}`;
          callback(null, `${filename}`);
        }
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return callback(new ForbiddenException('Only image files are allowed!'), false);
        }
        callback(null, true);
      }
    })
  )
  async uploadMultipleImages(
    @UploadedFiles() images: Array<Express.Multer.File>,
    @Param('hotelId') hotelId: number,
    @UserId() userId: number
  ): Promise<HotelImageArrayDataDto> {
    const hotelImages = await this.hotelService.createHotelImages(images, hotelId, userId);

    return { data: hotelImages };
  }
}
