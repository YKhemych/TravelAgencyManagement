export enum errorMessages {
  'EMAIL_USED' = 'Email already in use',
  'EMAIL_IS_INVALID' = 'Invalid email',
  'EMAIL_HAS_NOT_BEEN_SENT' = 'Email has not been sent',

  'TOKEN_IS_INVALID' = 'Token is invalid',
  'TOKEN_IS_MISSING' = 'Token is missing',
  'TOKEN_IS_BLACKMAILED' = 'Token is blackmailed',

  'PASSWORD_IS_INVALID' = 'Invalid password',
  'OLD_PASSWORD_IS_WRONG' = 'Old password is wrong',
  'CONF_PASSWORD_IS_WRONG' = 'Confirmation password is wrong',

  'AVAILABLE_ONLY_FOR_ADMIN' = 'This endpoint is available only for admin users',

  'USER_DOES_NOT_EXIST' = 'User does not exist with such email',
  'USER_IS_MISSING' = 'User is missing on request',

  'YOU_DO_NOT_HAVE_ACCESS_TO_INSTANCE' = 'You do not have access to the instance {instanceName}',

  'FIELD_SHOULD_NOT_BE_NULL' = 'Field {fieldName} should not be null or undefined',

  'INSTANCE_DOES_NOT_EXIST' = '{modelName} does not exist',

  'FIELD_IS_WRONG' = "Field '{fieldName}' is wrong"
}
