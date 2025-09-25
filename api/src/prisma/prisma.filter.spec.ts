import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { PrismaFilter } from './prisma.filter';
import { PrismaClientKnownRequestError } from 'generated/postgres/runtime/library';
import { Response } from 'express';

describe('PrismaFilter', () => {
  let filter: PrismaFilter;
  let mockResponse: Pick<Response, 'status' | 'json'>;
  let mockHost: Pick<ArgumentsHost, 'switchToHttp'>;

  beforeEach(() => {
    filter = new PrismaFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockHost = {
      switchToHttp: () => ({
        getRequest: jest.fn(),
        getResponse: jest.fn().mockReturnValue(mockResponse),
        getNext: jest.fn(),
      }),
    };
  });

  it('should be defined', () => {
    expect(new PrismaFilter()).toBeDefined();
  });

  it('should handle P2002 (Unique constraint)', () => {
    const exception = new PrismaClientKnownRequestError(
      'Unique constraint failed',
      { code: 'P2002', clientVersion: '4.x.x' },
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CONFLICT);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.CONFLICT,
      message: 'Record duplicated',
    });
  });

  it('should handle P2025 (Not found)', () => {
    const exception = new PrismaClientKnownRequestError('Record not found', {
      code: 'P2025',
      clientVersion: '4.x.x',
    });

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Record not found',
    });
  });

  it('should handle P2003 (Unprocessable entity / Relation error)', () => {
    const exception = new PrismaClientKnownRequestError(
      'Unprocessable entity',
      { code: 'P2003', clientVersion: '4.x.x' },
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.BAD_REQUEST,
      message: 'Something went wrong',
    });
  });

  it('should handle unknown error (P1000 => authentication database failed)', () => {
    const exception = new PrismaClientKnownRequestError(
      'Authentication failed',
      { code: 'P1000', clientVersion: '4.x.x' },
    );

    filter.catch(exception, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
    });
  });
});
