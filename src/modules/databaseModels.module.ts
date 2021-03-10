import { Module } from '@nestjs/common';
import {
  BlackmailedTokenProvider,
  UserProvider,
  AddressProvider,
  LocationProvider,
  CompanyProvider,
  HotelProvider,
  HotelImageProvider
} from '../providers/models.providers';

@Module({
  providers: [
    BlackmailedTokenProvider,
    UserProvider,
    AddressProvider,
    LocationProvider,
    CompanyProvider,
    HotelProvider,
    HotelImageProvider
  ],
  exports: [
    BlackmailedTokenProvider,
    UserProvider,
    AddressProvider,
    LocationProvider,
    CompanyProvider,
    HotelProvider,
    HotelImageProvider
  ]
})
export class DatabaseModelsModule {}
