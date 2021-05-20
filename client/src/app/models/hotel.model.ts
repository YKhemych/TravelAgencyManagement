import { AddressModel } from './address.model';
import { RoomModel } from './room.model';

export class HotelModel {
  id: number;
  name: string;
  description: string;
  phone: string;
  rating?: number;
  address: AddressModel;
  rooms?: RoomModel[];
  companyId: number;
}

export class HotelDataModel {
  data: HotelModel;
}

export class HotelArrayDataModel {
  data: HotelModel[];
}

export class HotelImageModel {
  id?: number;
  hotelId: number;
  imagePath: string;
}

export class HotelImageArrayDataModel {
  data: HotelImageModel[];
}
