import { ParseCuidPipe } from './parse-cuid.pipe';
import { ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

describe('ParseCuidPipe', () => {
  let pipe: ParseCuidPipe;

  let metadata: ArgumentMetadata;

  beforeEach(() => {
    pipe = new ParseCuidPipe();
    metadata = {
      type: 'param',
    };
  });

  it('should be defined', () => {
    expect(new ParseCuidPipe()).toBeDefined();
  });

  it('should throw BadRequestException when no data is provided', () => {
    const value = '';

    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });

  it('should return the same value', () => {
    const value = 'cjld2cyuq0000qcns8q7l68z3';
    const result = pipe.transform(value, metadata);

    expect(result).toEqual(value);
  });

  it('should throw BadRequestException for invalid CUID', () => {
    const value = 'not-a-valid-cuid';

    expect(() => pipe.transform(value, metadata)).toThrow(BadRequestException);
  });
});
