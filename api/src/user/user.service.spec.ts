/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PostgresService } from 'src/postgres/postgres.service';
import { User } from 'generated/postgres';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UserService', () => {
  let service: UserService;
  let postgres: PostgresService;

  const mockedUser: User = {
    id: '1234',
    email: 'test@test.com',
    password: 'test1234',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, PostgresService],
    }).compile();

    service = module.get<UserService>(UserService);
    postgres = module.get<PostgresService>(PostgresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const spyPostgres = jest
      .spyOn(postgres.user, 'create')
      .mockResolvedValue(mockedUser);

    const hashSpy = jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => 'hashedPassword');

    const result = await service.createUser({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(result).toEqual(
      expect.objectContaining({
        email: mockedUser.email,
      }),
    );
    expect(typeof result.password).toBe('string');
    expect(spyPostgres).toHaveBeenCalledWith({
      data: { email: mockedUser.email, password: expect.any(String) },
    });
    expect(hashSpy).toHaveBeenCalledWith(
      mockedUser.password,
      expect.any(Number),
    );
  });

  it('should get all user workspaces', async () => {
    const spyPostgres = jest
      .spyOn(postgres.workspace, 'findMany')
      .mockResolvedValue([]);

    const result = await service.getUserWorkspaces('1234');

    expect(result).toEqual([]);
    expect(spyPostgres).toHaveBeenCalledWith({ where: { userId: '1234' } });
  });

  it('should update a user', async () => {
    const spyPostgres = jest
      .spyOn(postgres.user, 'update')
      .mockResolvedValue({ ...mockedUser, email: 'test@gmail.com' });

    const hashSpy = jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => 'hashedPassword');

    const result = await service.updateUser(
      {
        email: mockedUser.email,
        password: mockedUser.password,
      },
      '1234',
    );

    expect(result).toEqual(
      expect.objectContaining({
        email: 'test@gmail.com',
      }),
    );
    expect(typeof result.password).toBe('string');
    expect(spyPostgres).toHaveBeenCalledWith({
      where: { id: '1234' },
      data: { email: mockedUser.email, password: expect.any(String) },
    });
    expect(hashSpy).toHaveBeenCalledWith(
      mockedUser.password,
      expect.any(Number),
    );
  });

  it('should delete a user', async () => {
    const spyPostgres = jest
      .spyOn(postgres.user, 'delete')
      .mockResolvedValue(mockedUser);

    await service.deleteUser('1234');
    expect(spyPostgres).toHaveBeenCalledWith({ where: { id: '1234' } });
  });
});
