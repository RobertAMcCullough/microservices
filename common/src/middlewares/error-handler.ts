import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

// want a standard error object to send back to react no matter the source

// will catch any errors that are thrown inside routes
// app.use() will know it's an error handler since it has 4 args
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // CustomError is abstract class that ensures status code and serializeErrors method
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  console.error(err); // so developer can see this unknown error after installing package
  res.status(400).send([{ message: `Unknown Errror: ${err?.message}` }]);
};

export { errorHandler };
