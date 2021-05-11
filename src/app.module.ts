import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { CompanyModule } from './modules/company.module';
import { HotelModule } from './modules/hotel.module';
import { StaticModule } from './modules/serverStatic.module';
import { OrderModule } from './modules/order.module';

@Module({
  imports: [
    StaticModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    CompanyModule,
    HotelModule,
    OrderModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
