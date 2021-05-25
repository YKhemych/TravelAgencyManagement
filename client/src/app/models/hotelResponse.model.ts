import { UserModel } from './authentication.model';

export class HotelResponseModel {
  id?: number;
  mark: number;
  description: string;
  userId: number;
  user?: UserModel;
  hotelId: number;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export class HotelResponseDataModel {
  data: HotelResponseModel;
}

export class HotelResponseArrayDataModel {
  data: HotelResponseModel[];
  totalCount?: number;
}
