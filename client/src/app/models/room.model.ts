export class RoomModel {
  id: number;
  name: string;
  description: string;
  roomType: string;
  roomCapacity: number;
  pricePerDay: number;
  hotelId: number;
}

export class RoomDataModel {
  data: RoomModel;
}

export class RoomArrayDataModel {
  data: RoomModel[];
}
