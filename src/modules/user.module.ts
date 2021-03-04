import { Module } from '@nestjs/common';
import { UserController } from '../controllers/user.controller';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { UserService } from '../services/user.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
