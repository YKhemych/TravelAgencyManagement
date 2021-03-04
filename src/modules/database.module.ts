import { Module } from '@nestjs/common';
import { DatabaseProvider } from '../providers/database.providers';

@Module({
  providers: [DatabaseProvider],
  exports: [DatabaseProvider]
})
export class DatabaseModule {}
