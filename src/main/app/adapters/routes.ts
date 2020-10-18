import { Request, Response } from 'express';
import { IController } from '@/presentation/protocols/IController';
import { HttpRequest } from '@/presentation/protocols/Http';

export const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response): Promise<Response> => {
    const httpRequest: HttpRequest = {
      body: request.body,
      userId: request.userId,
    };

    const httpResponse = await controller.handle(httpRequest);

    const { statusCode, body } = httpResponse;

    if (statusCode >= 400) {
      return response.status(statusCode).json({ error: body.message });
    }

    return response.status(statusCode).json(body);
  };
};
