import { BlackmailedToken } from '../models/blackmailedToken.model';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { Location } from '../models/location.model';

export const BlackmailedTokenProvider = {
  provide: 'BlackmailedTokenModel',
  useValue: BlackmailedToken
};

export const UserProvider = {
  provide: 'UserModel',
  useValue: User
};

export const AddressProvider = {
  provide: 'AddressModel',
  useValue: Address
};

export const LocationProvider = {
  provide: 'LocationModel',
  useValue: Location
};
