import { Module } from '@nestjs/common';
import {
  BlackmailedTokenProvider,
  UserProvider,
  AddressProvider,
  LocationProvider,
  CompanyProvider,
  HotelProvider,
  HotelImageProvider,
  HotelServiceProvider,
  RoomProvider,
  RoomServiceProvider,
  ServiceProvider,
  ServiceCategoryProvider,
  OrderProvider,
  OrderRoomProvider,
  OrderRoomServiceProvider
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
    HotelServiceProvider,
    RoomProvider,
    RoomServiceProvider,
    ServiceCategoryProvider,
    ServiceProvider,
    OrderProvider,
    OrderRoomProvider,
    OrderRoomServiceProvider
  ],
  exports: [
    BlackmailedTokenProvider,
    UserProvider,
    AddressProvider,
    LocationProvider,
    CompanyProvider,
    HotelProvider,
    HotelImageProvider,
    HotelServiceProvider,
    RoomProvider,
    RoomServiceProvider,
    ServiceCategoryProvider,
    ServiceProvider,
    OrderProvider,
    OrderRoomProvider,
    OrderRoomServiceProvider
  ]
})
export class DatabaseModelsModule {}
