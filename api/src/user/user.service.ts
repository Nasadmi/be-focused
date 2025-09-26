import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly postgres: PostgresService) {}

  async getWorkspaces(id: string) {
    return await this.postgres.workspace.findMany({
      where: {
        userId: id,
      },
    });
  }

  async createUser(user: CreateUserDTO) {
    user.password = await hash(user.password, process.env.HASH_ROUNDS || 10);
    return await this.postgres.user.create({ data: user });
  }

  async updateUser(user: UpdateUserDTO, id: string) {
    return await this.postgres.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: string) {
    return await this.postgres.user.delete({ where: { id } });
  }
}
