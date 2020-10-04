import { Request, Response } from 'express';
import { Controller } from '@/presentation/protocols/Controller';
import { HttpRequest } from '@/presentation/protocols/Http';

export const adaptRoute = (controller: Controller) => {
  return async (request: Request, response: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: request.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    const { statusCode, body } = httpResponse;

    return response.status(statusCode).json(body);
  };
};
