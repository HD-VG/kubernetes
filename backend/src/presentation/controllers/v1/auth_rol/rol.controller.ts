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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateRolDto, UpdateRolDto } from 'src/presentation/dtos/auth_rol/index.dto';
import { PaginationDto, DeleteManyDto, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard, JwtStrategy } from 'src/infrastructure/auth/guards/index.guard';

import {
  CreateRolUseCase,
  DeleteMultiplyRolUseCase,
  DeleteRolUseCase,
  FindAllRolUseCase,
  ListRolUseCase,
  UpdateRolUseCase,
  FindByIdRolUseCase
} from 'src/application/auth_rol/use-case/index.use-case';

@UseGuards(JwtAuthGuard, JwtStrategy, RolesGuard)
@Controller('v1/rol')
export class RolController {
  constructor(
    private readonly createRolUseCase: CreateRolUseCase,
    private readonly deleteMultiplyRolUseCase: DeleteMultiplyRolUseCase,
    private readonly deleteRolUseCase: DeleteRolUseCase,
    private readonly findAllRolUseCase: FindAllRolUseCase,
    private readonly listRolUseCase: ListRolUseCase,
    private readonly updateRolUseCase: UpdateRolUseCase,
    private readonly findByIdRolUseCase: FindByIdRolUseCase,
  ) { }

  @Post()
  create(@Body() createRolDto: CreateRolDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.createRolUseCase.execute(createRolDto, userId);
  }

  @Post('removeMultiply')
  removeMultiply(@Body() removeMultiply: DeleteManyDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteMultiplyRolUseCase.execute(removeMultiply, userId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.findAllRolUseCase.execute(paginationDto);
  }

  @Get('listRol')
  listRol() {
    return this.listRolUseCase.execute();
  }

  @Get('getById/:uuid')
  findOne(@Param('uuid') uuid: string, @Query() findByUuid: FindByUuid) {
    return this.findByIdRolUseCase.execute(findByUuid);
  }

  @Patch('update/:uuid')
  update(@Param('uuid') uuid: string, @Body() updateRolDto: UpdateRolDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.updateRolUseCase.execute(uuid, updateRolDto, userId);
  }

  @Delete('remove/:uuid')
  remove(@Param('uuid') uuid: string, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteRolUseCase.execute(uuid, userId);
  }
}
