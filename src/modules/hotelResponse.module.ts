import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { DatabaseModule } from './database.module';
import { HotelResponseService } from '../services/hotelResponse.service';
import { HotelResponseController } from '../controllers/hotelResponse.controller';

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [HotelResponseController],
  providers: [HotelResponseService]
})
export class HotelResponseModule {}
