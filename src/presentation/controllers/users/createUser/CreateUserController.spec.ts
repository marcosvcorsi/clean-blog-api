import { mockCreateUser } from '@/domain/test';
import { serverError } from '@/presentation/helpers/http';
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
});
