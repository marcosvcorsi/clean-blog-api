import MockDate from 'mockdate';
import { mockCreatePost } from '@/domain/test';
import { created, serverError } from '@/presentation/helpers/http';
import { HttpRequest } from '@/presentation/protocols/Http';
import { mockPostModel } from '@/data/test';
import { CreatePostController } from './CreatePostController';

const makeSut = () => {
  const createPostStub = mockCreatePost();
  const sut = new CreatePostController(createPostStub);

  return { sut, createPostStub };
};

const mockRequest = (): HttpRequest => ({
  userId: 1,
  body: {
    title: 'anytitle',
    content: 'anycontent',
  },
});

describe('CreatePostController Test', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call CreatePost create with correct values', async () => {
    const { sut, createPostStub } = makeSut();

    const createPostSpy = jest.spyOn(createPostStub, 'create');

    const request = mockRequest();

    await sut.handle(request);

    const { userId } = request;
    const { title, content } = request.body;

    expect(createPostSpy).toHaveBeenCalledWith({
      userId,
      title,
      content,
      date: new Date(),
    });
  });

  it('should return serverError if CreatePost throws', async () => {
    const { sut, createPostStub } = makeSut();

    jest
      .spyOn(createPostStub, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(serverError(new Error()));
  });

  it('should return created with a post on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(mockRequest());

    expect(response).toEqual(created(mockPostModel()));
  });
});
