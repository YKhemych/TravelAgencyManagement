import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: 'Unauthorized' })
  error: string;

  @ApiProperty({ example: 'Token is expired' })
  message: string;
}

export class EmailInUseError {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: 'Email already in use' })
  message: string;
}

export class EntityNotFoundError {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Bad Request' })
  error: string;

  @ApiProperty({ example: `Entity with given id doesn't exist` })
  message: string;
}
