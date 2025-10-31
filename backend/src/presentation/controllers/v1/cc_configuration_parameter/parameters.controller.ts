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
  CreateParameterDto,
  UpdateParameterDto,
} from '../../../dtos/cc_configuration_parameter/index-parameter.dto';
import {
  UpdateParameterUseCase,
  CreateParameterUseCase,
  DeleteParameterUseCase,
  FindByIdParameterUseCase,
  ListParameterUseCase,
} from 'src/application/cc_configuration_parameter/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-parameters')
export class ParametersController {
  constructor(
    private readonly createParameterUseCase: CreateParameterUseCase,
    private readonly updateParameterdUseCase: UpdateParameterUseCase,
    private readonly deleteParameterUseCase: DeleteParameterUseCase,
    private readonly listParameterUseCase: ListParameterUseCase,
    private readonly findByIdParameterUseCase: FindByIdParameterUseCase,
  ) {}

  @Post()
  create(@Body() createParameterdDto: CreateParameterDto, @Request() req) {
    return this.createParameterUseCase.execute(
      createParameterdDto,
      req.user.userId,
    );
  }

  @Get('list')
  findAll() {
    return this.listParameterUseCase.execute();
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findByIdParameterUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParameterdDto: UpdateParameterDto,
    @Request() req,
  ) {
    return this.updateParameterdUseCase.execute(
      +id,
      updateParameterdDto,
      req.userId,
    );
  }

  @Delete(':id')
  remove(@Param() findById: FindById, @Request() req) {
    return this.deleteParameterUseCase.execute(findById, req.user.userId);
  }
}
