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
  Query
} from '@nestjs/common';
import { CreateConfigurationUtilDto, UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { FindById, PaginationDto,FindByUuid } from 'src/common/dto/index.dto';
import { 
  CreateConfigurationUtilUseCase,
  UpdateConfigurationUtilUseCase,
  ListConfigurationUtilUseCase,
  FindByConfigurationUtilUseCase,
  FindAllDataConfigurationUtilUseCase,
  DeleteConfigurationUtilUseCase
} from 'src/application/ag_configuration_utils/use-cases/index.use-case'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-utils')
export class ConfigurationUtilController {
  constructor(
    private readonly createConfigurationUtilUseCase : CreateConfigurationUtilUseCase,
    private readonly updateConfigurationUtilUseCase : UpdateConfigurationUtilUseCase,
    private readonly listConfigurationUtilUseCase : ListConfigurationUtilUseCase,
    private readonly findByConfigurationUtilUseCase : FindByConfigurationUtilUseCase,
    private readonly findAllDataConfigurationUtilUseCase : FindAllDataConfigurationUtilUseCase,
    private readonly deleteConfigurationUtilUseCase : DeleteConfigurationUtilUseCase,
  ) {}

  @Post()
  create(
    @Body() createConfigurationUtilDto: CreateConfigurationUtilDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId};
    return this.createConfigurationUtilUseCase.execute(
      createConfigurationUtilDto, 
      user);
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationUtilUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationUtilUseCase.execute();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
      const viewId: FindByUuid = {uuid: id};
      return this.findByConfigurationUtilUseCase.execute(viewId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateConfigurationUtilDto: UpdateConfigurationUtilDto,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user: FindById = {id:req.user.userId};
    return this.updateConfigurationUtilUseCase.execute(
      updateId,
      updateConfigurationUtilDto,
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
      return this.deleteConfigurationUtilUseCase.execute(deleteId,  user);
    }
}
