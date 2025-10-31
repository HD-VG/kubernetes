/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto
} from 'src/presentation/dtos/auth/index.dto';
import {
  JwtAuthGuard,
  RolesGuard
} from 'src/infrastructure/auth/guards/index.guard';
import {
  PaginationDto,
  FindById,
  DeleteManyDto
} from 'src/common/dto/index.dto';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUserUseCase,
  DeleteMassiveUserUseCase,
  ListPaginationUserUseCase,
  FindOneByIdnUserUseCase,
  FindUserUseCase,
  DeleteUserUseCase,
  FindInformationUserUseCase
} from 'src/application/auth_user/use-cases/index-user.use-case';

@Controller('v1/user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsesrController {
  constructor(
    private readonly userCreateUseCase: CreateUserUseCase,
    private readonly userUpdateUseCase: UpdateUserUseCase,
    private readonly userListUseCase: ListUserUseCase,
    private readonly userDeleteMassiveUseCase: DeleteMassiveUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly listPaginationUserUseCase: ListPaginationUserUseCase,
    private readonly findOneByIdnUserUseCase: FindOneByIdnUserUseCase,
    private readonly findUserUseCase: FindUserUseCase,
    private readonly findInformationUserUseCase: FindInformationUserUseCase
  ) { }
  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const userId: number = req.user.userId;
    return await this.userCreateUseCase.execute(createUserDto, userId);
  }

  @Post('removeMultiply')
  async removeMultiply(@Body() removeMultiply: DeleteManyDto, @Request() req) {
    const userId: number = req.user.userId;
    return await this.userDeleteMassiveUseCase.execute(removeMultiply, userId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listPaginationUserUseCase.execute(paginationDto);
  }

  @Get('list')
  async list() {
    return this.userListUseCase.execute();
  }


  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findOneByIdnUserUseCase.execute(findById);
  }

  @Get('getById/:id')
  findById(@Param('id') id: number, @Query() findById: FindById) {
    return this.findUserUseCase.execute(findById);
  }

  @Get('getUser/info')
  findUser(@Request() req) {
    const userId: number = req.user.userId;
    return this.findInformationUserUseCase.execute(userId);
  }

  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto, @Request() req) {
    const userId: number = req.user.userId;
    return await this.userUpdateUseCase.execute(uuid, updateUserDto, userId);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string, @Request() req) {
    const userId: number = req.user.userId;
    return await this.deleteUserUseCase.execute(uuid, userId);
  }
}
