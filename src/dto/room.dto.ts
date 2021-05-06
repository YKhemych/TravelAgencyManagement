import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { RoomTypeEnum } from "../models/room.model";

export class RoomDto {
    id: number;

    @ApiProperty({ example: 'Room name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'description' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'super_lux' })
    @IsString()
    roomType: RoomTypeEnum;

    @ApiProperty({ example: 2 })
    @IsNumber()
    roomCapacity: number;

    @ApiProperty({ example: 50 })
    @IsNumber()
    pricePerDay: number;
}

export class RoomDataDto {
    @ApiProperty({ type: RoomDto })
    @Type(() => RoomDto)
    @ValidateNested()
    data: RoomDto;
}

export class RoomArrayDataDto {
    @ApiProperty({ type: [RoomDto] })
    @Type(() => RoomDto)
    @ValidateNested({ each: true })
    data: RoomDto[];
}
