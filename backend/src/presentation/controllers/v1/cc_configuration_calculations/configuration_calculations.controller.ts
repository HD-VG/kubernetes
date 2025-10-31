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
  CreateConfigurationCalculationDto,
  UpdateConfigurationCalculationDto,
} from 'src/presentation/dtos/cc_configuration_calculations/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateConfigurationCalculationUseCase,
  DeleteConfigurationCalculationUseCase,
  FindByIdConfigurationCalculationUseCase,
  ListConfigurationCalculationUseCase,
  ModifyStatusConfigurationCalculationUseCase,
  UpdateConfigurationCalculationUseCase,
  ModifyStatusAppsConfigurationCalculationUseCase
} from 'src/application/cc_configuration_calculation/use-case/index-configuration-calculation.use-case';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-calculations')
export class ConfigurationCalculationsController {
  constructor(
    private readonly createConfigurationCalculationUseCase: CreateConfigurationCalculationUseCase,
    private readonly deleteConfigurationCalculationUseCase: DeleteConfigurationCalculationUseCase,
    private readonly findByIdConfigurationCalculationUseCase: FindByIdConfigurationCalculationUseCase,
    private readonly listConfigurationCalculationUseCase: ListConfigurationCalculationUseCase,
    private readonly modifyStatusConfigurationCalculationUseCase: ModifyStatusConfigurationCalculationUseCase,
    private readonly updateConfigurationCalculationUseCase: UpdateConfigurationCalculationUseCase,
    private readonly modifyStatusAppsConfigurationCalculationUseCase: ModifyStatusAppsConfigurationCalculationUseCase,
  ) { }

  @Post()
  create(
    @Body()
    createConfigurationCalculationDto: CreateConfigurationCalculationDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.createConfigurationCalculationUseCase.execute(
      createConfigurationCalculationDto, userId
    );
  }

  @Get()
  findAll() {
    return this.listConfigurationCalculationUseCase.execute();
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findByIdConfigurationCalculationUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConfigurationCalculationDto: UpdateConfigurationCalculationDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updateConfigurationCalculationUseCase.execute(
      +id,
      updateConfigurationCalculationDto,
      userId
    );
  }

  @Patch(':id/status')
  modify_status(
    @Param('id') id: string,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    const idConfiguration = { id: +id }
    return this.modifyStatusConfigurationCalculationUseCase.execute(idConfiguration, userId);
  }

  @Patch(':id/status_apps')
  modify_status_apps(
    @Param('id') id: string,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    const idConfiguration = { id: +id }
    return this.modifyStatusAppsConfigurationCalculationUseCase.execute(idConfiguration, userId);
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req,) {
    const userId: number = req.user.userId;
    return this.deleteConfigurationCalculationUseCase.execute(findById, userId);
  }
}
