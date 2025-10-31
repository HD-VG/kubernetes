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
  CreateConfigurationUexpDto,
  UpdateConfigurationUexpDto,
} from 'src/presentation/dtos/cc_configuration_uexp/index.dto';
import {
  JwtAuthGuard,
  RolesGuard,
} from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateConfigurationUexpUseCase,
  DeleteConfigurationUexpUseCase,
  FindByIdtConfigurationUexpUseCase,
  ListConfigurationUexpUseCase,
  UpdateConfigurationUexpUseCase,
} from 'src/application/cc_configuration_uexp/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-uexp')
export class ConfigurationUexpController {
  constructor(
    private readonly createConfigurationUexpUseCase: CreateConfigurationUexpUseCase,
    private readonly deleteConfigurationUexpUseCase: DeleteConfigurationUexpUseCase,
    private readonly findByIdtConfigurationUexpUseCase: FindByIdtConfigurationUexpUseCase,
    private readonly listConfigurationUexpUseCase: ListConfigurationUexpUseCase,
    private readonly updateConfigurationUexpUseCase: UpdateConfigurationUexpUseCase,
  ) { }

  @Post()
  create(
    @Body() createConfigurationUexpDto: CreateConfigurationUexpDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.createConfigurationUexpUseCase.execute(
      createConfigurationUexpDto,
      userId,
    );
  }

  @Get()
  findAll() {
    return this.listConfigurationUexpUseCase.execute();
  }

  @Get('findById')
  findOne(@Query() findById: FindById) {
    return this.findByIdtConfigurationUexpUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfigurationUexpDto: UpdateConfigurationUexpDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updateConfigurationUexpUseCase.execute(
      +id,
      updateConfigurationUexpDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteConfigurationUexpUseCase.execute(findById, userId);
  }
}
