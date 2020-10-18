import { IHasher } from '@/data/protocols/crypto/IHasher';
import { IMail } from '@/data/protocols/mail/IMail';
import { ICreateUserRepository } from '@/data/protocols/database/users/ICreateUserRepository';
import { ILoadUserByEmailRepository } from '@/data/protocols/database/users/ILoadUserByEmailRepository';
import { UserModel } from '@/domain/models/User';
import {
  ICreateUser,
  CreateUserParams,
} from '@/domain/useCases/users/ICreateUser';

export class DbCreateUser implements ICreateUser {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly hasher: IHasher,
    private readonly createUserRepository: ICreateUserRepository,
    private readonly mail: IMail,
  ) {}

  async create(data: CreateUserParams): Promise<UserModel> {
    const { name, email, password } = data;

    await this.loadUserByEmailRepository.loadByEmail(email);

    const hashedPassword = await this.hasher.generate(password);

    const user = await this.createUserRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.mail.sendMail({
      to: {
        name,
        address: email,
      },
      subject: 'Cadastro',
      html: 'Você foi cadastrado com sucesso',
    });

    return user;
  }
}
