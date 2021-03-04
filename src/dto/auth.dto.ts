import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  id: number;
  email: string;
  role: string;
  randomKey: number;
}

export class Tokens {
  @ApiProperty({ example: 'Bearer xxx' })
  accessToken: string;

  @ApiProperty({ example: 'Bearer xxx' })
  refreshToken: string;
}

export class RefreshToken {
  @ApiProperty({ example: 'Bearer xxx' })
  refreshToken: string;
}
