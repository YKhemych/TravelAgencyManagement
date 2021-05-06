import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from './address.dto';

export class CompanyDto {
  id: number;

  @ApiPropertyOptional({ example: 'mail@mail.com' })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ example: 'Company name' })
  @IsString()
  name: string;

  @ApiProperty({ type: AddressDto })
  @Type(() => AddressDto)
  @ValidateNested()
  address: AddressDto;

  isActive: boolean;
}

export class CompanyDataDto {
  @ApiProperty({ type: CompanyDto })
  @Type(() => CompanyDto)
  @ValidateNested()
  data: CompanyDto;
}
