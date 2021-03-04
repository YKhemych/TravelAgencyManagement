import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  UnauthorizedException
} from '@nestjs/common';

export class InvalidEmailError extends BadRequestException {
  constructor(message?: any) {
    super(message);
  }
}

export class InvalidPasswordError extends BadRequestException {
  constructor(message?: any) {
    super(message);
  }
}

export class OldPasswordIsWrongError extends BadRequestException {
  constructor(message?: any) {
    super(message);
  }
}

export class ConfirmationPasswordIsWrongError extends BadRequestException {
  constructor(message?: any) {
    super(message);
  }
}

export class TokenBlackmailedError extends GoneException {
  constructor(message?: any) {
    super(message);
  }
}

export class UserDoesNotExistError extends UnauthorizedException {
  constructor(message?: any) {
    super(message);
  }
}

export class YouDoNotHaveAccessToInstanceError extends ForbiddenException {
  constructor(instanceName?: string) {
    super(instanceName);
  }
}

export class FieldShouldNotBeNullError extends BadRequestException {
  constructor(fieldName: any) {
    super(fieldName);
  }
}

export class InstanceDoesNotExist extends BadRequestException {
  constructor(modelName: any) {
    super(modelName);
  }
}

export class FieldIsWrong extends BadRequestException {
  constructor(fieldName: any) {
    super(fieldName);
  }
}
