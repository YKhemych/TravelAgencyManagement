import {RoomModel} from "./room.model";

export class OrderModel {
  id?: number;
  price: number;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  isAccepted?: boolean;
  isExecuted?: boolean;
  isPaid?: boolean;
  hotelId: number;
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
}
