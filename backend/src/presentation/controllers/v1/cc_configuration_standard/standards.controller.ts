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
import { CreateStandardDto } from '../../../dtos/cc_configuration_standard/create-standard.dto';
import { UpdateStandardDto } from '../../../dtos/cc_configuration_standard/update-standard.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateStandardUseCase,
  DeleteStandardUseCase,
  FindByIdtStandardUseCase,
  ListStandardUseCase,
  UpdateStandardUseCase,
} from 'src/application/cc_configuration_standard/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-standards')
export class StandardsController {
  constructor(
    private readonly createStandardUseCase: CreateStandardUseCase,
    private readonly updateStandardUseCase: UpdateStandardUseCase,
    private readonly deleteStandardUseCase: DeleteStandardUseCase,
    private readonly listStandardUseCase: ListStandardUseCase,
    private readonly findByIdStandardUseCase: FindByIdtStandardUseCase,
  ) {}

  @Post()
  create(@Body() createStandardDto: CreateStandardDto, @Request() req) {
    return this.createStandardUseCase.execute(
      createStandardDto,
      req.user.userId,
    );
  }

  @Get('list')
  findAll() {
    return this.listStandardUseCase.execute();
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findByIdStandardUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStandardDto: UpdateStandardDto,
    @Request() req,
  ) {
    return this.updateStandardUseCase.execute(
      +id,
      updateStandardDto,
      req.userId,
    );
  }

  @Delete(':id')
  remove(@Param() findById: FindById, @Request() req) {
    return this.deleteStandardUseCase.execute(findById, req.user.userId);
  }
}
