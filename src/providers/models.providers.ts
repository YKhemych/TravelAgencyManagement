import { BlackmailedToken } from '../models/blackmailedToken.model';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { Location } from '../models/location.model';
import { Company } from '../models/company.model';
import { HotelImage } from '../models/hotelImage.model';
import { Hotel } from '../models/hotel.model';

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

export const CompanyProvider = {
  provide: 'CompanyModel',
  useValue: Company
};

export const HotelProvider = {
  provide: 'HotelModel',
  useValue: Hotel
};

export const HotelImageProvider = {
  provide: 'HotelImageModel',
  useValue: HotelImage
};
