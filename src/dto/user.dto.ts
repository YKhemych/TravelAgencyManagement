import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  ValidateNested
} from 'class-validator';
import { Roles, User } from '../models/user.model';
import { Transform, Type } from 'class-transformer';

export interface RequestWithUserInfo extends Request {
  user: User;
}

export class CreateUserDto {
  @ApiPropertyOptional({ example: 'User name' })
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'User surname' })
  @IsOptional()
  surname?: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  // @Transform(strings => strings.trim())
  email: string;

  @ApiProperty({ example: 'Password' })
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  // @Transform(strings => strings.trim())
  email: string;

  @ApiProperty({ example: 'Password' })
  @IsNotEmpty()
  password: string;
}

export class UserResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'User name' })
  name: string;

  @ApiProperty({ example: 'User surname' })
  surname: string;

  @ApiPropertyOptional({ example: '380977913642' })
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ example: 'user@gmail.com' })
  email: string;

  @ApiPropertyOptional({ example: 'user' })
  role: Roles;
}

export class UserResponseWithTokens extends UserResponse {
  @ApiProperty({ example: 'Bearer xxx' })
  accessToken: string;

  @ApiProperty({ example: 'Bearer xxx' })
  refreshToken: string;
}

export class UserPropertyDto {
  @ApiProperty({ example: '0' })
  cacheSize: number;

  @ApiProperty({ example: '10' })
  mDashTokenLimit: number;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'user@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'client | config' })
  @IsNotEmpty()
  appName: string;
}

export class ResetPasswordDataDto {
  @ApiProperty({ type: ResetPasswordDto })
  @Type(() => ResetPasswordDto)
  @ValidateNested()
  data: ResetPasswordDto;
}

export class ChangePasswordDto {
  @ApiProperty({ example: '3aa73a0a-8ead-4e4d-9355-fa44f1a27780' })
  @IsNotEmpty()
  resetUuid: string;

  @ApiProperty({ example: 'Password' })
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDataDto {
  @ApiProperty({ type: ChangePasswordDto })
  @Type(() => ChangePasswordDto)
  @ValidateNested()
  data: ChangePasswordDto;
}

export class ChangePasswordByOldOneDto {
  @ApiProperty({ example: 'oldPass' })
  @MinLength(6)
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ example: 'newPassword' })
  @MinLength(6)
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ example: 'newPassword' })
  @MinLength(6)
  @IsNotEmpty()
  confirmationPassword: string;
}

export class ChangePasswordByOldOneDataDto {
  @ApiProperty({ type: ChangePasswordByOldOneDto })
  @Type(() => ChangePasswordByOldOneDto)
  @ValidateNested()
  data: ChangePasswordByOldOneDto;
}
