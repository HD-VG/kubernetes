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
  CreateConfigurationTypeWorkDto,
  UpdateConfigurationTypeWorkDto,
} from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { PaginationDto, FindById, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { 
  CreateConfigurationTypeWorkUseCase,
  UpdateConfigurationTypeWorkUseCase,
  ListConfigurationTypeWorkUseCase,
  FindByConfigurationTypeWorkUseCase,
  FindAllDataConfigurationTypeWorkUseCase,
  DeleteConfigurationTypeWorkUseCase
} from 'src/application/ag_configuration_type_work/use-cases/index.use-case'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-type-work')
export class ConfigurationTypeWorkController {
  constructor(
    private readonly createConfigurationTypeWorkUseCase : CreateConfigurationTypeWorkUseCase,
    private readonly updateConfigurationTypeWorkUseCase : UpdateConfigurationTypeWorkUseCase,
    private readonly listConfigurationTypeWorkUseCase : ListConfigurationTypeWorkUseCase,
    private readonly findByConfigurationTypeWorkUseCase : FindByConfigurationTypeWorkUseCase,
    private readonly findAllDataConfigurationTypeWorkUseCase : FindAllDataConfigurationTypeWorkUseCase,
    private readonly deleteConfigurationTypeWorkUseCase : DeleteConfigurationTypeWorkUseCase,
  ) {}

  @Post()
  create(
    @Body() createConfigurationTypeWorkDto: CreateConfigurationTypeWorkDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId};
    return this.createConfigurationTypeWorkUseCase.execute(
      createConfigurationTypeWorkDto,
      user
    );
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationTypeWorkUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationTypeWorkUseCase.execute();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
      const viewId: FindByUuid = {uuid: id};
      return this.findByConfigurationTypeWorkUseCase.execute(viewId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateConfigurationTypeWorkDto: UpdateConfigurationTypeWorkDto,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user: FindById = {id:req.user.userId};
    return this.updateConfigurationTypeWorkUseCase.execute(
      updateId,
      updateConfigurationTypeWorkDto,
      user
    );
  }

  @Delete(':id')
    remove(
      @Param('id') id: string,
      @Request() req,
    ) {
      const deleteId: FindByUuid = {uuid: id};
      const user: FindById = {id:req.user.userId};
      return this.deleteConfigurationTypeWorkUseCase.execute(deleteId,  user);
    }
}
