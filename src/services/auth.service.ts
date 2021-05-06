import { BadRequestException, Inject, Injectable, NotAcceptableException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from '../config/config';
import {
  ChangePasswordByOldOneDto,
  ChangePasswordDto,
  CreateUserDto,
  LoginDto,
  ResetPasswordDto
} from '../dto/user.dto';
import { BlackmailedToken } from '../models/blackmailedToken.model';
import { User } from '../models/user.model';
import {
  ConfirmationPasswordIsWrongError,
  InvalidEmailError,
  InvalidPasswordError,
  OldPasswordIsWrongError,
  TokenBlackmailedError,
  UserDoesNotExistError
} from '../classes/errors.class';
// import { MailSenderService } from './mailSender.service';
import { random, omit } from 'lodash';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { JwtPayload, Tokens } from '../dto/auth.dto';

const JWT_ALGORITHM = 'HS256';

export const enum TokenTypeEnum {
  access = 'access',
  refresh = 'refresh'
}

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserModel') private readonly userModel: typeof User,
    @Inject('BlackmailedTokenModel')
    private readonly blackmailedTokenModel: typeof BlackmailedToken,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize // private readonly mailSenderService: MailSenderService
  ) {}

  async validateAndGetUser(
    tokenHeader: string,
    tokenType: TokenTypeEnum,
    transaction?: Transaction
  ): Promise<User> {
    // move out bearer prefix
    const token = this.getTokenFromHeader(tokenHeader);

    // verify token and get payload
    let payload: JwtPayload;
    try {
      payload = jwt.verify(
        token,
        tokenType === TokenTypeEnum.access ? config.JWT_SECRET : config.JWT_REFRESH_SECRET,
        {
          algorithms: [JWT_ALGORITHM]
        }
      ) as JwtPayload;
    } catch (err) {
      throw new NotAcceptableException();
    }

    // get user by payload
    const user = await this.userModel.findByEmail(payload.email, { transaction });

    if (!user) {
      throw new UserDoesNotExistError();
    }

    return user;
  }

  async signTokens(user: User): Promise<Tokens> {
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      randomKey: random(1, 1000)
    };

    return {
      accessToken: `Bearer ${jwt.sign(payload, config.JWT_SECRET, {
        expiresIn: config.JWT_EXPIRES,
        algorithm: JWT_ALGORITHM
      })}`,
      refreshToken: `Bearer ${jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_EXPIRES,
        algorithm: JWT_ALGORITHM
      })}`
    };
  }

  async checkCredentials(loginDto: LoginDto): Promise<User> {
    // trim space around email
    const email = loginDto.email.trim();

    // get user from DB
    const user = await this.userModel.findByEmail(email);

    // user does not exist
    if (!user) {
      throw new InvalidEmailError();
    }
    // password correct
    if (user.comparePasswords(loginDto.password)) {
      return user;
    }

    // password invalid
    throw new InvalidPasswordError();
  }

  async blackmailToken(tokenHeader: string, transaction?: Transaction): Promise<BlackmailedToken> {
    const refreshToken = this.getTokenFromHeader(tokenHeader);

    // check refresh token (is blackmailed)
    const existingToken = await this.blackmailedTokenModel.findOne({
      where: { token: refreshToken },
      transaction
    });
    if (existingToken) {
      return existingToken;
    }

    // blackmail old token
    return this.blackmailedTokenModel.create({ token: refreshToken } as BlackmailedToken, {
      transaction
    });
  }

  async refreshToken(tokenHeader: string): Promise<Tokens> {
    const transaction = await this.sequelize.transaction();

    try {
      // move out bearer prefix
      const refreshToken = this.getTokenFromHeader(tokenHeader);

      // check refresh token (is blackmailed)
      const isBlackmailedToken = await this.blackmailedTokenModel.findOne({
        where: { token: refreshToken },
        transaction
      });

      if (isBlackmailedToken) {
        throw new TokenBlackmailedError();
      }

      // get user by header
      const user = await this.validateAndGetUser(tokenHeader, TokenTypeEnum.refresh, transaction);

      // sing new tokens
      const tokens = await this.signTokens(user);

      // blackmail old token
      await this.blackmailedTokenModel.create({ token: refreshToken } as BlackmailedToken, {
        transaction
      });

      await transaction.commit();

      return tokens;
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }

  getTokenFromHeader(tokenHeader: string): string {
    return tokenHeader.split(' ')[1];
  }

  checkPassword(password: string): boolean {
    // minimum 6 characters
    const reg = new RegExp('^.{6,}$');

    return reg.test(password);
  }

  async register(userDto: CreateUserDto): Promise<User> {
    try {
      // trim space around email
      const email = userDto.email.trim();

      // get user from DB
      const existingUser = await this.userModel.findByEmail(email);

      // user already exist
      if (existingUser) {
        throw new BadRequestException();
      }

      // password is wrong
      if (!this.checkPassword(userDto.password)) {
        throw new InvalidPasswordError();
      }

      // create new user
      const user = await this.userModel.create({
        email,
        ...omit(userDto, ['role', 'email'])
      } as User);

      return user;
    } catch (err) {
      throw err;
    }
  }

  // async resetPassword(resetPassword: ResetPasswordDto): Promise<boolean> {
  //   const user = await this.userModel.findByEmail(resetPassword.email);
  //
  //   if (!user) {
  //     throw new UserDoesNotExistError();
  //   }
  //
  //   // create hash to change user password
  //   const { shareLink } = await this.shareLinkService.createShareLink({
  //     modelType: 'reset_password',
  //     modelId: user.id,
  //     userId: user.id
  //   });
  //
  //   // send email
  //   await this.mailSenderService.sendResetPasswordMessage(
  //     user.email,
  //     user.name,
  //     resetPassword.appName,
  //     shareLink
  //   );
  //
  //   return true;
  // }

  // async changePassword(changePassword: ChangePasswordDto): Promise<boolean> {
  //   try {
  //     const shareLinkResponse = await this.shareLinkService.getModelByShareLink(
  //       changePassword.resetUuid
  //     );
  //
  //     const user: User = shareLinkResponse.data as User;
  //
  //     await this.userModel.changePassword(user.id, changePassword.password);
  //
  //     await this.shareLinkService.setExpiresAtToCurrent(changePassword.resetUuid);
  //
  //     return true;
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  async changePasswordByOldOne(
    changePassword: ChangePasswordByOldOneDto,
    userId: number
  ): Promise<boolean> {
    try {
      const user = await this.userModel.findByPk(userId);

      const oldPassIsCorrect = user!.comparePasswords(changePassword.oldPassword);

      if (!oldPassIsCorrect) {
        throw new OldPasswordIsWrongError();
      }

      const newPassIsCorrect = changePassword.newPassword === changePassword.confirmationPassword;

      if (!newPassIsCorrect) {
        throw new ConfirmationPasswordIsWrongError();
      }

      await this.userModel.changePassword(userId, changePassword.newPassword);

      return true;
    } catch (err) {
      throw err;
    }
  }
}
