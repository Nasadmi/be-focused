import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

export const GetIdHeader = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    if (!request['user']) {
      throw new UnauthorizedException('Unauthorized');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return request['user'];
  },
);
