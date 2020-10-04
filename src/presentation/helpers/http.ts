import { ServerError } from '../errors/ServerError';
import { HttpResponse } from '../protocols/Http';

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
};
