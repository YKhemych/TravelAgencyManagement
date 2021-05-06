import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';
import { RoomDto } from "./room.dto";

export class HotelDto {
    id: number;

    @ApiProperty({ example: 'Hotel name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'description' })
    @IsString()
    description: string;

    @ApiProperty({ example: '380977913642' })
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({ example: 5 })
    @IsNumber()
    @IsOptional()
    rating?: number;

    @ApiProperty({ type: AddressDto })
    @Type(() => AddressDto)
    @ValidateNested()
    address: AddressDto;

    @ApiProperty({ type: [RoomDto] })
    @Type(() => RoomDto)
    @ValidateNested({each: true})
    @IsOptional()
    rooms?: RoomDto[];

    companyId: number;
}

export class HotelDataDto {
    @ApiProperty({ type: HotelDto })
    @Type(() => HotelDto)
    @ValidateNested()
    data: HotelDto;
}

export class HotelArrayDataDto {
    @ApiProperty({ type: [HotelDto] })
    @Type(() => HotelDto)
    @ValidateNested({ each: true })
    data: HotelDto[];
}
