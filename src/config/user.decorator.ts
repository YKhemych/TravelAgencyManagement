import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common'

export const UserInfo = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return user;
});

export const UserId = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;

  return user.id;
});
