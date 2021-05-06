import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { DatabaseModelsModule } from './databaseModels.module';
import { DatabaseModule } from './database.module';
import { CompanyController } from '../controllers/company.controller';
import { CompanyService } from '../services/company.service';
import { AddressService } from '../services/address.service';

@Module({
  imports: [DatabaseModule, AuthModule, DatabaseModelsModule],
  controllers: [CompanyController],
  providers: [CompanyService, AddressService]
})
export class CompanyModule {}
