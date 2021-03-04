import { BlackmailedToken } from '../models/blackmailedToken.model';
import { User } from '../models/user.model';

export const BlackmailedTokenProvider = {
  provide: 'BlackmailedTokenModel',
  useValue: BlackmailedToken
};

export const UserProvider = {
  provide: 'UserModel',
  useValue: User
};
