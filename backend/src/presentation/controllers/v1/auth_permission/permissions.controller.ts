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
import {
  CreatePermissionDto,
  UpdatePermissionDto
} from 'src/presentation/dtos/auth_permission/index.dto';
import { FindById, PaginationDto } from 'src/common/dto/index.dto';
import {
  JwtAuthGuard,
  RolesGuard
} from 'src/infrastructure/auth/guards/index.guard';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  FindOnePermissionUseCase,
  ListPaginationPermissionUseCase,
  UpdatePermissionUseCase
} from 'src/application/auth_permission/use-case/index.use-case';

@Controller('v1/permissions')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PermissionsController {
  constructor(
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    private readonly deletePermissionUseCase: DeletePermissionUseCase,
    private readonly findOnePermissionUseCase: FindOnePermissionUseCase,
    private readonly listPaginationPermissionUseCase: ListPaginationPermissionUseCase,
    private readonly updatePermissionUseCase: UpdatePermissionUseCase,
  ) { }

  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.createPermissionUseCase.execute(createPermissionDto, userId);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listPaginationPermissionUseCase.execute(paginationDto);
  }

  @Get(':id')
  findOne(@Body() findById: FindById) {
    return this.findOnePermissionUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updatePermissionUseCase.execute(+id, updatePermissionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deletePermissionUseCase.execute(findById, userId);
  }
}
