import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
  Scope,
  UnauthorizedException
} from '@nestjs/common';
import { AuthService, TokenTypeEnum } from '../services/auth.service';
import { errorMessages } from '../enums/errorMessages.enum';
import { UserDoesNotExistError } from '../classes/errors.class';

@Injectable({ scope: Scope.REQUEST })
export class AuthenticateGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const tokenHeader = request.headers.authorization;

    if (!tokenHeader) {
      throw new UnauthorizedException(errorMessages.TOKEN_IS_MISSING);
    }

    request.user = await this.authService
      .validateAndGetUser(tokenHeader, TokenTypeEnum.access)
      .catch((err) => {
        switch (err.constructor) {
          case NotAcceptableException:
            throw new UnauthorizedException(errorMessages.TOKEN_IS_INVALID);
          case UserDoesNotExistError:
            throw new BadRequestException(errorMessages.USER_DOES_NOT_EXIST);
          default:
            throw err;
        }
      });

    return true;
  }
}
