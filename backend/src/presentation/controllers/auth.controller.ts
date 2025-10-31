/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CheckDto } from 'src/presentation/dtos/auth/index.dto';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CheckTokensUseCase,
  GetUserUseCase,
  LoginUseCase
} from 'src/application/auth/use-cases/index.use-case';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly checkTokensUseCase: CheckTokensUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) { }
  @Post('login')
  async login(@Body() checkDto: CheckDto) {
    return await this.loginUseCase.execute(checkDto);
  }
  @UseGuards(RolesGuard)
  @Get('/check-token')
  async checkTokens(@Request() req: Request) {
    return await this.checkTokensUseCase.execute(req);
  }

  @UseGuards(RolesGuard)
  @Get('get-user')
  async get_user(@Request() req: Request): Promise<AnswerQuery> {
    return await this.getUserUseCase.execute(req)
  }
}
