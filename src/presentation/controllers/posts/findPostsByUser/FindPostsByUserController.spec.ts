import { mockFindPostsByUser } from '@/domain/test';
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
  it('should call FindPostsByUser with correct value', async () => {
    const { sut, findPostsByUserStub } = makeSut();

    const findPostsSpy = jest.spyOn(findPostsByUserStub, 'findByUser');

    const request = mockRequest();

    await sut.handle(request);

    expect(findPostsSpy).toHaveBeenCalledWith(request.userId);
  });
});
