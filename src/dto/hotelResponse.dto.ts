import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UserResponse } from './user.dto';

export class HotelResponseDto {
  id: number;

  @ApiProperty({ example: 7 })
  @IsNumber()
  mark: number;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 21 })
  userId: number;

  @ApiProperty({ type: UserResponse })
  @Type(() => UserResponse)
  @ValidateNested()
  @IsOptional()
  user?: UserResponse;

  @ApiProperty({ example: 11 })
  @IsNumber()
  hotelId: number;

  isActive: boolean;

  createdAt: Date | string;
  updatedAt: Date | string;

  @ApiProperty({ example: '2021-05-21 10:10:10' })
  @IsOptional()
  deletedAt: Date | string;
}

export class HotelResponseDataDto {
  @ApiProperty({ type: HotelResponseDto })
  @Type(() => HotelResponseDto)
  @ValidateNested()
  data: HotelResponseDto;
}

export class HotelResponseArrayDataDto {
  @ApiProperty({ type: [HotelResponseDto] })
  @Type(() => HotelResponseDto)
  @ValidateNested({ each: true })
  data: HotelResponseDto[];

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsOptional()
  totalCount?: number;
}
