import { Module } from '@nestjs/common';
import {
  BlackmailedTokenProvider,
  UserProvider,
  AddressProvider,
  LocationProvider
} from '../providers/models.providers';

@Module({
  providers: [BlackmailedTokenProvider, UserProvider, AddressProvider, LocationProvider],
  exports: [BlackmailedTokenProvider, UserProvider, AddressProvider, LocationProvider]
})
export class DatabaseModelsModule {}
