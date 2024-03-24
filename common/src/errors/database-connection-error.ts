import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  constructor() {
    super('error from db');

    // Only because we're extended a built in class and in TS
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  statusCode = 500 // required in abstract class
  reason = 'There was an error connecting to the database';
  serializeErrors() {
    // return type set in abstract class
    return [{ message: this.reason }];
  }
}
