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
  ServiceCategoryProvider
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
    ServiceProvider
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
    ServiceProvider
  ]
})
export class DatabaseModelsModule {}
