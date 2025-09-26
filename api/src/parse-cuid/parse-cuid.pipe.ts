/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isCuid } from '@paralleldrive/cuid2';

@Injectable()
export class ParseCuidPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Id must be an non-empty string');
    }

    if (isCuid(value)) {
      return value;
    } else {
      throw new BadRequestException(`${value} is invalid`);
    }
  }
}
