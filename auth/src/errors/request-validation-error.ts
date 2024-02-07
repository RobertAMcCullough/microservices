import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  constructor(public errors: ValidationError[]) {
    super('error from validation');

    // Only because we're extended a built in class and in TS
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  statusCode = 400;
  serializeErrors() {
    const errors: {message: string, field?: string}[] = [];
    this.errors.forEach((e) => {
      if (e.type === 'field')
        errors.push({ message: e.msg.toString(), field: e.path });
    });
    return errors;
  };
}
