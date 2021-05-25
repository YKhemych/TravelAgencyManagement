import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomDto } from './room.dto';
import { HotelDto } from './hotel.dto';

export class OrderDto {
  id: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @IsOptional()
  price: number;

  @ApiProperty({ example: 'description' })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ example: '2021-05-10 14:00:00' })
  @IsString()
  @IsOptional()
  startTime: Date;

  @ApiProperty({ example: '2021-05-17 11:00:00' })
  @IsString()
  @IsOptional()
  endTime: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isAccepted: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isExecuted: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  @IsOptional()
  isPaid: boolean;

  @ApiProperty({ example: 5 })
  @IsNumber()
  @IsOptional()
  hotelId: number;

  @ApiProperty({ type: HotelDto })
  @Type(() => HotelDto)
  @ValidateNested()
  @IsOptional()
  hotel?: HotelDto;

  userId: number;

  @ApiProperty({ example: [1, 2] })
  @IsOptional()
  roomIds?: number[];

  @ApiProperty({ type: [RoomDto] })
  @Type(() => RoomDto)
  @ValidateNested({ each: true })
  @IsOptional()
  rooms?: RoomDto[];

  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class OrderDataDto {
  @ApiProperty({ type: OrderDto })
  @Type(() => OrderDto)
  @ValidateNested()
  data: OrderDto;
}

export class OrderArrayDataDto {
  @ApiProperty({ type: [OrderDto] })
  @Type(() => OrderDto)
  @ValidateNested({ each: true })
  data: OrderDto[];

  @ApiProperty({ example: 50 })
  @IsNumber()
  @IsOptional()
  totalCount?: number;
}
