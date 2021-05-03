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
  OrderRoomProvider,
  HotelResponseProvider
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
    OrderRoomProvider,
    HotelResponseProvider
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
    OrderRoomProvider,
    HotelResponseProvider
  ]
})
export class DatabaseModelsModule {}
