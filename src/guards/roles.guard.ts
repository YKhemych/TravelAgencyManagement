import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Scope
} from '@nestjs/common';
import { errorMessages } from '../enums/errorMessages.enum';

@Injectable({ scope: Scope.REQUEST })
export class IsAdminGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new InternalServerErrorException(errorMessages.USER_IS_MISSING);
    }
    if (!request.user.isAdmin()) {
      throw new ForbiddenException(errorMessages.AVAILABLE_ONLY_FOR_ADMIN);
    }

    return true;
  }
}
