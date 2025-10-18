import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PostgresService } from 'src/postgres/postgres.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly postgres: PostgresService,
  ) {}

  async login(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('No data provided');
    }

    const user = await this.postgres.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Unauthorized');
    }

    const token = await this.jwtService.signAsync({ id: user.id });

    return token;
  }
}
