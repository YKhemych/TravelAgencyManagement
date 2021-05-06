import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { DatabaseModule } from './database.module';
import { AddressService } from '../services/address.service';
import { HotelService } from "../services/hotel.service";
import { HotelController } from "../controllers/hotel.controller";
import { RoomService } from "../services/room.service";
import { RoomController } from "../controllers/room.controller";

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [HotelController, RoomController],
  providers: [HotelService, AddressService, RoomService]
})
export class HotelModule {}
