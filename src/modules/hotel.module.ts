import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { DatabaseModule } from './database.module';
import { AddressService } from '../services/address.service';
import { HotelService } from "../services/hotel.service";
import { HotelController } from "../controllers/hotel.controller";

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [HotelController],
  providers: [HotelService, AddressService]
})
export class HotelModule {}
