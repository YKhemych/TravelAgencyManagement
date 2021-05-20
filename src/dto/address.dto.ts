import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class LocationDto {
  @ApiPropertyOptional({ example: 49.4342 })
  @IsNumber()
  latitude: number;

  @ApiPropertyOptional({ example: 9.8142 })
  @IsNumber()
  longitude: number;
}

export class AddressDto {
  id: number;

  @ApiPropertyOptional({ example: 'Ukraine' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ example: 'Lviv' })
  @IsString()
  city: string;

  @ApiPropertyOptional({ example: 'Zelena st.' })
  @IsString()
  street: string;

  @ApiPropertyOptional({ example: 'Lvivska ob.' })
  @IsString()
  state: string;

  @ApiPropertyOptional({ example: '79045' })
  @IsString()
  zip: string;

  @ApiProperty({ type: LocationDto })
  @Type(() => LocationDto)
  @ValidateNested()
  @IsOptional()
  location?: LocationDto;
}
