import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export enum AppEnv {
  DEVELOPMENT = 'development',
  STAGE = 'stage',
  MASTER = 'master',
  UNKNOWN = 'unknown'
}

export class AppVersionDto {
  @ApiProperty({ example: 'stage', enum: AppEnv })
  env: AppEnv;

  @ApiProperty({ example: '123' })
  build: string;
}

export class MessageDto {
  @ApiProperty({ example: 'Message' })
  message: string;
}

export class StatusDto {
  @ApiProperty({ example: 'success' })
  status: string;
}

export class StatusDataDto {
  @ApiProperty({ type: StatusDto })
  @Type(() => StatusDto)
  @ValidateNested()
  data: StatusDto;
}

export class StatusWithMessageDto {
  @ApiProperty({ example: 'success' })
  status: string;

  @ApiProperty({ example: 'Message' })
  message: string;
}

export class StatusWithMessageDataDto {
  @ApiProperty({ type: StatusWithMessageDto })
  @Type(() => StatusWithMessageDto)
  @ValidateNested()
  data: StatusWithMessageDto;
}
