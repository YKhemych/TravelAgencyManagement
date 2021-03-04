import { Module } from '@nestjs/common';
import { BlackmailedTokenProvider, UserProvider } from '../providers/models.providers';

@Module({
  providers: [BlackmailedTokenProvider, UserProvider],
  exports: [BlackmailedTokenProvider, UserProvider]
})
export class DatabaseModelsModule {}
