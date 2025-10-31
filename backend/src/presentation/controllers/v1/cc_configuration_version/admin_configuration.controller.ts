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
import { CreateAdminConfigurationDto, UpdateAdminConfigurationDto } from 'src/presentation/dtos/cc_configuration_version/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateConfigurationVersionUseCase,
  DeleteConfigurationVersionUseCase,
  FindByIdConfigurationVersionUseCase,
  ListConfigurationVersionUseCase,
  UpdateConfigurationVersionUseCase,
  ModifyStatusConfigurationVersionUseCase
} from 'src/application/cc_configuration_version/use-cases/index-configuration-version.use-case';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/admin-configuration')
export class ConfigurationVersionController {
  constructor(
    private readonly createConfigurationVersionUseCase: CreateConfigurationVersionUseCase,
    private readonly deleteConfigurationVersionUseCase: DeleteConfigurationVersionUseCase,
    private readonly findByIdConfigurationVersionUseCase: FindByIdConfigurationVersionUseCase,
    private readonly listConfigurationVersionUseCase: ListConfigurationVersionUseCase,
    private readonly updateConfigurationVersionUseCase: UpdateConfigurationVersionUseCase,
    private readonly modifyStatusConfigurationVersionUseCase: ModifyStatusConfigurationVersionUseCase,
  ) { }

  @Post()
  create(
    @Body() createAdminConfigurationDto: CreateAdminConfigurationDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.createConfigurationVersionUseCase.execute(
      createAdminConfigurationDto,
      userId,
    );
  }

  @Get()
  findAll() {
    return this.listConfigurationVersionUseCase.execute();
  }

  @Get(':id')
  findById(@Query() findById: FindById) {
    return this.findByIdConfigurationVersionUseCase.execute(findById);
  }

  @Patch(':id/status')
  modify_status(
    @Param('id') id: string,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    const idConfiguration = { id: +id }
    return this.modifyStatusConfigurationVersionUseCase.execute(idConfiguration, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAdminConfigurationDto: UpdateAdminConfigurationDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.updateConfigurationVersionUseCase.execute(
      +id,
      updateAdminConfigurationDto,
      userId
    );
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteConfigurationVersionUseCase.execute(findById, userId);
  }
}
