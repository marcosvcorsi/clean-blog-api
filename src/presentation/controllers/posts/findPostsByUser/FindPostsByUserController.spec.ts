import MockDate from 'mockdate';
import { mockPostModelList } from '@/data/test';
import { mockFindPostsByUser } from '@/domain/test';
import { ok, serverError } from '@/presentation/helpers/http';
import { HttpRequest } from '@/presentation/protocols/Http';
import { FindPostsByUserController } from './FindPostsByUserController';

const makeSut = () => {
  const findPostsByUserStub = mockFindPostsByUser();
  const sut = new FindPostsByUserController(findPostsByUserStub);

  return { sut, findPostsByUserStub };
};

const mockRequest = (): HttpRequest => ({
  userId: 1,
});

describe('FindPostsByUserController Test', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call FindPostsByUser with correct value', async () => {
    const { sut, findPostsByUserStub } = makeSut();

    const findPostsSpy = jest.spyOn(findPostsByUserStub, 'findByUser');

    const request = mockRequest();

    await sut.handle(request);

    expect(findPostsSpy).toHaveBeenCalledWith(request.userId);
  });

  it('should return serverError if FindPostsByUser throws', async () => {
    const { sut, findPostsByUserStub } = makeSut();

    jest
      .spyOn(findPostsByUserStub, 'findByUser')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  it('should return posts on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(ok(mockPostModelList()));
  });
});
