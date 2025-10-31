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
  Query,
  Request,
} from '@nestjs/common';
import {
  CreateTypeWaterDto,
  UpdateTypeWaterDto,
} from 'src/presentation/dtos/cc_configuration_type_water/index.dto';
import {
  JwtAuthGuard,
  RolesGuard,
} from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateConfigurationTypeWaterUseCase,
  DeleteConfigurationTypeWaterUseCase,
  FindByIdtConfigurationTypeWaterUseCase,
  ListConfigurationTypeWaterUseCase,
  UpdateConfigurationTypeWaterUseCase,
} from 'src/application/cc_configuration_type_water/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-type-water')
export class TypeWaterController {
  constructor(
    private readonly createConfigurationTypeWaterUseCase: CreateConfigurationTypeWaterUseCase,
    private readonly deleteConfigurationTypeWaterUseCase: DeleteConfigurationTypeWaterUseCase,
    private readonly findByIdtConfigurationTypeWaterUseCase: FindByIdtConfigurationTypeWaterUseCase,
    private readonly listConfigurationTypeWaterUseCase: ListConfigurationTypeWaterUseCase,
    private readonly updateConfigurationTypeWaterUseCase: UpdateConfigurationTypeWaterUseCase,
  ) {}

  @Post()
  create(@Body() createTypeWaterDto: CreateTypeWaterDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.createConfigurationTypeWaterUseCase.execute(
      createTypeWaterDto,
      userId,
    );
  }

  @Get()
  findAll() {
    return this.listConfigurationTypeWaterUseCase.execute();
  }

  @Get('findById')
  findOne(@Query() findById: FindById) {
    return this.findByIdtConfigurationTypeWaterUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeWaterDto: UpdateTypeWaterDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updateConfigurationTypeWaterUseCase.execute(
      +id,
      updateTypeWaterDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteConfigurationTypeWaterUseCase.execute(findById, userId);
  }
}
