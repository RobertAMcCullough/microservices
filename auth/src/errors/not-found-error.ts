import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  statusCode = 400;
  serializeErrors() {
    return [{ message: 'Invalid Route!' }];
  }
}
