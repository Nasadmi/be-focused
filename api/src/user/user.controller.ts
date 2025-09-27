import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParseCuidPipe } from 'src/parse-cuid/parse-cuid.pipe';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetIdHeader } from 'src/get-id-header/get-id-header.decorator';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUserWorkspaces(@GetIdHeader('id', ParseCuidPipe) id: string) {
    const workspaces = await this.userService.getUserWorkspaces(id);
    return workspaces;
  }

  @Post()
  async createUser(@Body() user: CreateUserDTO) {
    const newUser = await this.userService.createUser(user);
    return {
      token: await this.jwt.signAsync({ id: newUser.id }),
    };
  }

  @UseGuards(AuthGuard)
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteUser(@GetIdHeader() id: string) {
    await this.userService.deleteUser(id);
  }

  @UseGuards(AuthGuard)
  @Put()
  async updateUser(
    @GetIdHeader() userId: string,
    @Body() newUser: UpdateUserDTO,
  ) {
    const updatedUser = await this.userService.updateUser(newUser, userId);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, password, ...rest } = updatedUser;
    return rest;
  }
}
