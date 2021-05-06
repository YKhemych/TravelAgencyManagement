import { BadRequestException, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserId } from '../config/user.decorator';
import { AuthenticateGuard } from '../guards/auth.guard';
import { Body } from '@nestjs/common';
import { InstanceDoesNotExist, YouDoNotHaveAccessToInstanceError } from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { RoomService } from "../services/room.service";
import { RoomDataDto } from "../dto/room.dto";

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('Room')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('')
  @ApiCreatedResponse({
    type: RoomDataDto,
    description: 'Room successfully created'
  })
  async createRoom(
    @Body() roomDataDto: RoomDataDto,
    @UserId() userId: number
  ): Promise<RoomDataDto> {
    try {
      const room = await this.roomService.createRoom(roomDataDto.data, userId);

      return { data: room };
    } catch (err) {
      switch (err.constructor) {
        case InstanceDoesNotExist:
          throw new BadRequestException(errorMessages.INSTANCE_DOES_NOT_EXIST);
        case YouDoNotHaveAccessToInstanceError:
          throw new BadRequestException(errorMessages.YOU_DO_NOT_HAVE_ACCESS_TO_INSTANCE);
        default:
          throw err;
      }
    }
  }
}
