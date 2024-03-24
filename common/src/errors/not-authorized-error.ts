import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  constructor(msg: string) {
    super(msg); // will assign to this.message
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  statusCode = 401;
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: 'Not Authorized' }];
  }
}
