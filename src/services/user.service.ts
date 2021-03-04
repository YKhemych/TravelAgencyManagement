import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlackmailedToken } from '../models/blackmailedToken.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('BlackmailedTokenModel')
    private readonly blackmailedTokenModel: typeof BlackmailedToken
  ) {}

  async removeUserAccount(userId: number): Promise<void> {
    const response = this.userModel.destroy({ where: { id: userId } });

    if (!response) {
      throw new InternalServerErrorException();
    }
  }
}
