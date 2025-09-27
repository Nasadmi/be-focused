import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

process.env.JWT_KEY = 'secret';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let jwtService: JwtService;

  let validToken: string | undefined = '';
  let bearer = true;
  const invalidToken = '1234';

  const mockedExecutionContext: Pick<ExecutionContext, 'switchToHttp'> = {
    switchToHttp: () => ({
      getNext: jest.fn(),
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: `${bearer ? 'Bearer' : 'Auth'} ${validToken || invalidToken}`,
        },
      }),
      getResponse: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'secret',
        }),
      ],
      providers: [AuthGuard],
    }).compile();

    guard = moduleRef.get<AuthGuard>(AuthGuard);
    jwtService = moduleRef.get<JwtService>(JwtService);
    validToken = await jwtService.signAsync({ id: '1234' });
  });

  it('should be defined', () => {
    expect(new AuthGuard(new JwtService())).toBeDefined();
  });

  it('allow if token is correct', async () => {
    await expect(
      guard.canActivate(mockedExecutionContext as ExecutionContext),
    ).resolves.toBe(true);
  });

  it('should throw UnauthorizedException (authorization method invalid)', async () => {
    bearer = false;

    await expect(
      guard.canActivate(mockedExecutionContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException (invalid token)', async () => {
    bearer = true;
    validToken = undefined;

    await expect(
      guard.canActivate(mockedExecutionContext as ExecutionContext),
    ).rejects.toThrow(UnauthorizedException);
  });
});
