import { Request, Response } from 'express';
import { IController } from '@/presentation/protocols/IController';
import { HttpRequest } from '@/presentation/protocols/Http';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: request.body,
    };

    const httpResponse = await controller.handle(httpRequest);

    const { statusCode, body } = httpResponse;

    return response.status(statusCode).json(body);
  };
};
