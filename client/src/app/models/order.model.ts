import { RoomModel } from './room.model';
import { HotelModel } from './hotel.model';

export class OrderModel {
  id?: number;
  price: number;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  isAccepted?: boolean;
  isExecuted?: boolean;
  isPaid?: boolean;
  status?: string;
  hotelId: number;
  hotel?: HotelModel;
  userId: number;
  roomIds?: number[];
  rooms?: RoomModel[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class OrderDataModel {
  data: OrderModel;
}

export class OrderArrayDataModel {
  data: OrderModel[];
  totalCount: number;
}
