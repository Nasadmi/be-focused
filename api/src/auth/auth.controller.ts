import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signIn(@Body() body: SignInDTO) {
    const token = await this.authService.login(body.email, body.password);
    return { token };
  }
}
