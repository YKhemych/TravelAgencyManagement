import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { DatabaseModule } from './modules/database.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/auth.module';
import { CompanyModule } from './modules/company.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
