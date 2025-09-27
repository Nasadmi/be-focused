import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let postgres: PostgresService;
  let jwt: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, PostgresService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    postgres = module.get<PostgresService>(PostgresService);
    jwt = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw UnauthorizedException (no email or password provided)', async () => {
    await expect(() => service.login('test@test.com', '')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException (user not found)', async () => {
    const spy = jest.spyOn(postgres.user, 'findUnique').mockResolvedValue(null);

    await expect(() =>
      service.login('test@test.com', 'test1234'),
    ).rejects.toThrow(UnauthorizedException);

    expect(spy).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
  });

  it('should throw UnauthorizedException (password failed)', async () => {
    const hashed = await bcrypt.hash('test4567', 10);
    const spy = jest.spyOn(postgres.user, 'findUnique').mockResolvedValue({
      id: '123-456',
      email: 'test@test.com',
      password: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(() =>
      service.login('test@test.com', 'test1234'),
    ).rejects.toThrow(UnauthorizedException);
    expect(spy).toHaveBeenCalledWith({ where: { email: 'test@test.com' } });
    expect(bcrypt.compareSync('test1234', hashed)).toBeFalsy();
  });

  it('should return jwt token', async () => {
    const key = Math.random().toString(36).slice(2);
    const spyJwt = jest.spyOn(jwt, 'signAsync').mockResolvedValue(key);
    const hashed = await bcrypt.hash('test1234', 10);
    const spyPostgres = jest
      .spyOn(postgres.user, 'findUnique')
      .mockResolvedValue({
        id: '123-456',
        email: 'test@test.com',
        password: hashed,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    await expect(() =>
      service.login('test@test.com', 'test1234'),
    ).resolves.toEqual(key);
    expect(spyPostgres).toHaveBeenCalledWith({
      where: { email: 'test@test.com' },
    });
    expect(bcrypt.compareSync('test1234', hashed)).toBeTruthy();
    expect(spyJwt).toHaveBeenCalledWith({ id: '123-456' });
  });
});
