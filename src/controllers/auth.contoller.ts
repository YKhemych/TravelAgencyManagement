import {
  BadRequestException,
  Body,
  Controller,
  GoneException,
  NotAcceptableException,
  Post,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiGoneResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags
} from '@nestjs/swagger';
import { EmailInUseError, UnauthorizedError } from '../dto/errors.dto';
import {
  CreateUserDto,
  LoginDto,
  UserResponseWithTokens,
  ChangePasswordByOldOneDataDto
} from '../dto/user.dto';
import { BlackmailedToken } from '../models/blackmailedToken.model';
import { AuthService } from '../services/auth.service';
import {
  ConfirmationPasswordIsWrongError,
  InvalidEmailError,
  InvalidPasswordError,
  OldPasswordIsWrongError,
  TokenBlackmailedError,
  UserDoesNotExistError
} from '../classes/errors.class';
import { errorMessages } from '../enums/errorMessages.enum';
import { MessageDto } from '../dto/app.dto';
import { AuthenticateGuard } from '../guards/auth.guard';
import { UserId } from '../config/user.decorator';
import { supportMessages } from '../enums/supportMessages.enum';
import { RefreshToken, Tokens } from '../dto/auth.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiCreatedResponse({
    type: UserResponseWithTokens,
    description: 'Returns access and refresh token'
  })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
    description: `User doesn't exist or wrong credentials`
  })
  async login(@Body() loginDto: LoginDto): Promise<UserResponseWithTokens> {
    try {
      // check user credentials
      const user = await this.authService.checkCredentials(loginDto);

      // sign access and refresh tokens
      const tokens = await this.authService.signTokens(user);

      return { ...user.removePassword(), ...tokens };
    } catch (err) {
      switch (err.constructor) {
        case InvalidEmailError:
          throw new BadRequestException(errorMessages.EMAIL_IS_INVALID);
        case InvalidPasswordError:
          throw new BadRequestException(errorMessages.PASSWORD_IS_INVALID);
        default:
          throw err;
      }
    }
  }

  @Post('logout')
  @ApiOkResponse({ description: 'Token successfully saved as blackmailed' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
    description: `User doesn't exist or wrong credentials`
  })
  logout(@Body() token: RefreshToken): Promise<BlackmailedToken> {
    return this.authService.blackmailToken(token.refreshToken);
  }

  @Post('refresh')
  @ApiOkResponse({ type: Tokens, description: 'Token successfully refreshed' })
  @ApiGoneResponse({ description: 'Token is blackmailed' })
  @ApiUnauthorizedResponse({
    type: UnauthorizedError,
    description: `User doesn't exist or wrong credentials`
  })
  async refresh(@Body() token: RefreshToken): Promise<Tokens> {
    try {
      const refreshToken = await this.authService.refreshToken(token.refreshToken);

      return refreshToken;
    } catch (err) {
      switch (err.constructor) {
        case TokenBlackmailedError:
          throw new GoneException(errorMessages.TOKEN_IS_BLACKMAILED);
        case NotAcceptableException:
          throw new NotAcceptableException(errorMessages.TOKEN_IS_INVALID);
        case UserDoesNotExistError:
          throw new UnauthorizedException(errorMessages.USER_DOES_NOT_EXIST);
        default:
          throw err;
      }
    }
  }

  @Post('register')
  @ApiCreatedResponse({
    type: UserResponseWithTokens,
    description: 'User created successfully'
  })
  @ApiBadRequestResponse({ type: EmailInUseError, description: 'Email already in use' })
  @ApiInternalServerErrorResponse({ description: 'Error in creating user' })
  async register(@Body() userDto: CreateUserDto): Promise<UserResponseWithTokens> {
    try {
      // register new user
      const user = await this.authService.register(userDto);

      // sign access and refresh tokens
      const tokens = await this.authService.signTokens(user);

      return { ...user.removePassword(), ...tokens };
    } catch (err) {
      switch (err.constructor) {
        case BadRequestException:
          throw new BadRequestException(errorMessages.EMAIL_USED);
        case InvalidPasswordError:
          throw new BadRequestException(errorMessages.PASSWORD_IS_INVALID);
        default:
          throw err;
      }
    }
  }

  // @Post('reset_pass')
  // @ApiOkResponse({ type: MessageDto, description: 'Letter was sent successfully' })
  // @ApiBadRequestResponse({ description: 'Email does not exist' })
  // @ApiBadGatewayResponse({ description: 'Email has not been sent' })
  // async resetPassword(
  //   @Body() resetPasswordData: ResetPasswordDataDto,
  // ): Promise<MessageDto> {
  //   try {
  //     await this.authService.resetPassword(resetPasswordData.data);
  //
  //     return { message: supportMessages.LINK_FOR_RESETTING_PASS_WAS_SENT) };
  //   } catch (err) {
  //     switch (err.constructor) {
  //       case EmailHasNotBeenSentError:
  //         throw new BadGatewayException(errorMessages.EMAIL_HAS_NOT_BEEN_SENT);
  //       case UserDoesNotExistError:
  //         throw new BadRequestException(errorMessages.USER_DOES_NOT_EXIST);
  //       default:
  //         throw err;
  //     }
  //   }
  // }
  //
  // @Post('change_pass')
  // @ApiOkResponse({ type: MessageDto, description: 'Password was changed' })
  // @ApiBadRequestResponse({ description: 'Share link does not exist' })
  // @ApiGoneResponse({ description: 'Link was expired' })
  // async changePassword(
  //   @Body() changePasswordData: ChangePasswordDataDto,
  // ): Promise<MessageDto> {
  //   try {
  //     await this.authService.changePassword(changePasswordData.data);
  //
  //     return { message: supportMessages.PASSWORD_WAS_CHANGED) };
  //   } catch (err) {
  //     switch (err.constructor) {
  //       case ShareLinkDoesNotExistError:
  //         throw new BadRequestException(errorMessages.SHARE_LINK_DOES_NOT_EXIST);
  //       case LinkWasExpiredError:
  //         throw new GoneException(errorMessages.SHARE_LINK_WAS_EXPIRED);
  //       default:
  //         throw err;
  //     }
  //   }
  // }

  @Post('password/change')
  @ApiBearerAuth()
  @UseGuards(AuthenticateGuard)
  @ApiOkResponse({ type: MessageDto, description: 'Password was changed' })
  @ApiBadRequestResponse({ description: 'Password is not correct' })
  async changePasswordByOldOne(
    @Body() changePasswordData: ChangePasswordByOldOneDataDto,
    @UserId() userId: number
  ): Promise<MessageDto> {
    try {
      await this.authService.changePasswordByOldOne(changePasswordData.data, userId);

      return { message: supportMessages.PASSWORD_WAS_CHANGED };
    } catch (err) {
      switch (err.constructor) {
        case OldPasswordIsWrongError:
          throw new BadRequestException(errorMessages.OLD_PASSWORD_IS_WRONG);
        case ConfirmationPasswordIsWrongError:
          throw new BadRequestException(errorMessages.CONF_PASSWORD_IS_WRONG);
        default:
          throw err;
      }
    }
  }
}
