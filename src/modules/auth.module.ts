import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.contoller';
import { AuthenticateGuard } from '../guards/auth.guard';
import { IsAdminGuard } from '../guards/roles.guard';
import { AuthService } from '../services/auth.service';
import { DatabaseModelsModule } from './databaseModels.module';
// import { MailSenderService } from '../services/mailSender.service';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule, DatabaseModelsModule],
  providers: [AuthService, IsAdminGuard, AuthenticateGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthenticateGuard, IsAdminGuard]
})
export class AuthModule {}
