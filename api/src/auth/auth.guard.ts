import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException('Unauthorized');
    try {
      const id = (
        await this.jwtService.verifyAsync<{ id?: string }>(token, {
          secret: process.env.JWT_KEY,
        })
      ).id;

      request['user'] = id || '';
    } catch {
      throw new UnauthorizedException('Unauthorized');
    }

    return true;
  }

  extractTokenFromHeader(req: Request) {
    const [type, token] = req.headers.authorization?.split(' ') || [];
    return type === 'Bearer' ? token : undefined;
  }
}
