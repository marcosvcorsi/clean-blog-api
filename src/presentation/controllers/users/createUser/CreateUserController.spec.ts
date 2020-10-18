import { mockCreateUser } from '@/domain/test';
import { EmailInUseError } from '@/presentation/errors/EmailInUseError';
import { badRequest, created, serverError } from '@/presentation/helpers/http';
import { CreateUserController } from './CreateUserController';

const makeSut = () => {
  const createUserStub = mockCreateUser();

  const sut = new CreateUserController(createUserStub);

  return { sut, createUserStub };
};

const mockRequest = () => ({
  body: {
    name: 'anyname',
    email: 'anymail@mail.com',
    password: 'anypassword',
    passwordConfirmation: 'anypassword',
  },
});

describe('CreateUserController Test', () => {
  it('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut();

    const createUserSpy = jest.spyOn(createUserStub, 'create');

    const request = mockRequest();

    await sut.handle(request);

    const { name, email, password } = request.body;

    expect(createUserSpy).toHaveBeenCalledWith({ name, email, password });
  });

  it('should return serverError if CreateUser throws', async () => {
    const { sut, createUserStub } = makeSut();

    jest
      .spyOn(createUserStub, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  it('should return badRequest if CreateUser returns null', async () => {
    const { sut, createUserStub } = makeSut();

    jest
      .spyOn(createUserStub, 'create')
      .mockReturnValueOnce(Promise.resolve(null));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(badRequest(new EmailInUseError()));
  });

  it('should return created with name and email on success', async () => {
    const { sut } = makeSut();

    const httpRequest = mockRequest();

    const response = await sut.handle(httpRequest);

    const { name, email } = httpRequest.body;

    expect(response).toEqual(
      created({
        name,
        email,
      }),
    );
  });
});
