import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { PostgresService } from 'src/postgres/postgres.service';
import { User } from 'generated/postgres';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  let jwt: JwtService;

  const mockedUser: User = {
    id: '1234',
    email: 'test@test.com',
    password: 'test1234',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [JwtService, UserService, PostgresService],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should GET all user workspaces', async () => {
    const spyService = jest
      .spyOn(service, 'getUserWorkspaces')
      .mockResolvedValue([]);

    const workspaces = await controller.getUserWorkspaces('1234');
    expect(workspaces).toEqual([]);
    expect(spyService).toHaveBeenCalledWith('1234');
  });

  it('POST (create a new user)', async () => {
    const spyService = jest
      .spyOn(service, 'createUser')
      .mockResolvedValue(mockedUser);

    const spyJwt = jest.spyOn(jwt, 'signAsync').mockResolvedValue('');

    const access = await controller.createUser({
      email: mockedUser.email,
      password: mockedUser.password,
    });

    expect(access).toHaveProperty('token', expect.any(String));
    expect(spyService).toHaveBeenCalledWith({
      email: mockedUser.email,
      password: mockedUser.password,
    });
    expect(spyJwt).toHaveBeenCalledWith({ id: '1234' });
  });

  it('DELETE a user', async () => {
    const spyService = jest
      .spyOn(service, 'deleteUser')
      .mockImplementationOnce(() => Promise.resolve());

    await controller.deleteUser('1234');
    expect(spyService).toHaveBeenCalledWith('1234');
  });

  it('PUT (update a user)', async () => {
    const spyService = jest
      .spyOn(service, 'updateUser')
      .mockResolvedValue({ ...mockedUser, email: 'test@gmail.com' });

    const updatedUser = await controller.updateUser('1234', {
      email: 'test@gmail.com',
    });

    expect(updatedUser).toHaveProperty('email', 'test@gmail.com');
    expect(spyService).toHaveBeenCalledWith(
      {
        email: 'test@gmail.com',
      },
      '1234',
    );
  });
});
