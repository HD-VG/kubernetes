/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CreateLimitDto } from '../../../dtos/cc_configuration_limit/create-limit.dto';
import { UpdateLimitDto } from '../../../dtos/cc_configuration_limit/update-limit.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateLimitUseCase,
  DeleteLimitUseCase,
  FindByIdLimitUseCase,
  ListLimitUseCase,
  ToListLimitUseCase,
  UpdateLimitUseCase,
} from 'src/application/cc_configuration_limit/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-limits')
export class LimitsController {
  constructor(
    private readonly createLimitUseCase: CreateLimitUseCase,
    private readonly updateLimitUseCase: UpdateLimitUseCase,
    private readonly deleteLimitUseCase: DeleteLimitUseCase,
    private readonly listLimitUseCase: ListLimitUseCase,
    private readonly findByIdLimitUseCase: FindByIdLimitUseCase,
    private readonly toListLimit: ToListLimitUseCase
  ) { }

  @Post()
  create(@Body() createLimitDto: CreateLimitDto, @Request() req) {
    return this.createLimitUseCase.execute(createLimitDto, req.user.userId);
  }

  @Get('list')
  findAll() {
    return this.listLimitUseCase.execute();
  }

  @Get('to-list')
  toFindList() {
    return this.toListLimit.execute();
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findByIdLimitUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLimitUseCase: UpdateLimitDto,
    @Request() req,
  ) {
    return this.updateLimitUseCase.execute(+id, updateLimitUseCase, req.userId);
  }

  @Delete(':id')
  remove(@Param() findById: FindById, @Request() req) {
    return this.deleteLimitUseCase.execute(findById, req.user.userId);
  }
}
