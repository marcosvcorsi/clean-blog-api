import { ServerError } from '../errors/ServerError';
import { HttpResponse } from '../protocols/Http';

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack),
  };
};

export const created = (data: any): HttpResponse => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const ok = (data: any): HttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: {},
  };
};

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});
