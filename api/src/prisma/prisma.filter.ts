import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from 'generated/postgres';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaFilter implements ExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: Pick<ArgumentsHost, 'switchToHttp'>,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';

    switch (exception.code) {
      case 'P2002':
        statusCode = HttpStatus.CONFLICT;
        message = 'Record duplicated';
        break;
      case 'P2025':
        statusCode = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;
      case 'P2003':
        statusCode = HttpStatus.BAD_REQUEST;
        message = 'Something went wrong';
        break;
      default:
        message = 'Internal Server Error';
    }

    response.status(statusCode).json({
      statusCode,
      message,
    });
  }
}
