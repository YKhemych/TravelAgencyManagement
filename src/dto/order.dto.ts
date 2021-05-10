import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomDto } from "./room.dto";

export class OrderDto {
  id: number;

  @ApiProperty({ example: 500 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ example: '2021-05-10 14:00:00' })
  @IsString()
  startTime: Date;

  @ApiProperty({ example: '2021-05-17 11:00:00' })
  @IsString()
  endTime: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  isAccepted: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  isExecuted: boolean;

  @ApiProperty({ example: false })
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty({ example: 5 })
  @IsNumber()
  hotelId: number;

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
}
