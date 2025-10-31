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
  CreateConfigurationTypeMachineDto,
  UpdateConfigurationTypeMachineDto,
} from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { FindById, FindByUuid, PaginationDto } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { 
  CreateConfigurationTypeMachineUseCase,
  UpdateConfigurationTypeMachineUseCase,
  ListConfigurationTypeMachineUseCase,
  FindByConfigurationTypeMachineUseCase,
  FindAllDataConfigurationTypeMachineUseCase,
  DeleteConfigurationTypeMachineUseCase
} from 'src/application/ag_configuration_type_machine/use-cases/index.use-case'
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-type-machine')
export class ConfigurationTypeMachineController {
  constructor(
    private readonly createConfigurationTypeMachineUseCase : CreateConfigurationTypeMachineUseCase,
    private readonly updateConfigurationTypeMachineUseCase : UpdateConfigurationTypeMachineUseCase,
    private readonly listConfigurationTypeMachineUseCase : ListConfigurationTypeMachineUseCase,
    private readonly findByConfigurationTypeMachineUseCase : FindByConfigurationTypeMachineUseCase,
    private readonly findAllDataConfigurationTypeMachineUseCase : FindAllDataConfigurationTypeMachineUseCase,
    private readonly deleteConfigurationTypeMachineUseCase : DeleteConfigurationTypeMachineUseCase,
  ) {}

  @Post()
  create(
    @Body()
    createConfigurationTypeMachineDto: CreateConfigurationTypeMachineDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId,};
    return this.createConfigurationTypeMachineUseCase.execute(
      createConfigurationTypeMachineDto,
      user,
    );
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationTypeMachineUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationTypeMachineUseCase.execute();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
      const viewId: FindByUuid = {uuid: id};
      return this.findByConfigurationTypeMachineUseCase.execute(viewId);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateConfigurationTypeMachineDto: UpdateConfigurationTypeMachineDto,
  ) {
    const updateId: FindByUuid = {uuid: id,};
    const user: FindById = {id:req.user.userId,};
    return this.updateConfigurationTypeMachineUseCase.execute(
      updateId,
      updateConfigurationTypeMachineDto,
      user,
    );
  }

  @Delete(':id')
    remove(
      @Param('id') id: string,
      @Request() req,
    ) {
      const deleteId: FindByUuid = {uuid: id,};
      const user: FindById = {id:req.user.userId,};
      return this.deleteConfigurationTypeMachineUseCase.execute(deleteId, user);
    }
}
