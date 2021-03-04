import { createParamDecorator } from '@nestjs/common';
import { RequestWithUserInfo } from '../dto/user.dto';

export const UserInfo = createParamDecorator((data: any, req: RequestWithUserInfo) => {
  return req.user;
});

export const UserId = createParamDecorator((data: any, req: RequestWithUserInfo) => {
  return req.user.id;
});
