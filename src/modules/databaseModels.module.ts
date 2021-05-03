import { Module } from '@nestjs/common';
import {
  BlackmailedTokenProvider,
  UserProvider,
  AddressProvider,
  LocationProvider,
  CompanyProvider,
  HotelProvider,
  HotelImageProvider,
  RoomProvider,
  OrderProvider,
  OrderRoomProvider
} from '../providers/models.providers';

@Module({
  providers: [
    BlackmailedTokenProvider,
    UserProvider,
    AddressProvider,
    LocationProvider,
    CompanyProvider,
    HotelProvider,
    HotelImageProvider,
    RoomProvider,
    OrderProvider,
    OrderRoomProvider
  ],
  exports: [
    BlackmailedTokenProvider,
    UserProvider,
    AddressProvider,
    LocationProvider,
    CompanyProvider,
    HotelProvider,
    HotelImageProvider,
    RoomProvider,
    OrderProvider,
    OrderRoomProvider
  ]
})
export class DatabaseModelsModule {}
