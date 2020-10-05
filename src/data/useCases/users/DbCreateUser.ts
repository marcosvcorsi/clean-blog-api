import { Hasher } from '@/data/protocols/crypto/Hasher';
import { Mail } from '@/data/protocols/mail/Mail';
import { CreateUserRepository } from '@/data/protocols/users/CreateUserRepository';
import { UserModel } from '@/domain/models/User';
import { CreateUser, CreateUserParams } from '@/domain/useCases/CreateUser';

export class DbCreateUser implements CreateUser {
  constructor(
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly mail: Mail,
  ) {}

  async create(data: CreateUserParams): Promise<UserModel> {
    const { name, email, password } = data;

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
