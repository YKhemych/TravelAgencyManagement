import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { DatabaseModule } from './database.module';
import { OrderController } from '../controllers/order.controller';
import { OrderService } from '../services/order.service';

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
