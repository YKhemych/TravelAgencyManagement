import { Controller, Delete, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserId, UserInfo } from '../config/user.decorator';
import { UserResponse } from '../dto/user.dto';
import { AuthenticateGuard } from '../guards/auth.guard';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { supportMessages } from '../enums/supportMessages.enum';
import { StatusWithMessageDataDto } from '../dto/app.dto';

@ApiBearerAuth()
@UseGuards(AuthenticateGuard)
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    type: UserResponse,
    description: 'Get user information'
  })
  getUser(@UserInfo() user: User): UserResponse {
    return user.removePassword();
  }

  @Delete('remove')
  @ApiOkResponse({
    description: 'User account successfully removed'
  })
  async removeUserAccount(@UserId() userId: number): Promise<StatusWithMessageDataDto> {
    try {
      await this.userService.removeUserAccount(userId);

      return { data: { status: 'success', message: supportMessages.USER_ACCOUNT_REMOVED } };
    } catch (err) {
      throw err;
    }
  }
}
