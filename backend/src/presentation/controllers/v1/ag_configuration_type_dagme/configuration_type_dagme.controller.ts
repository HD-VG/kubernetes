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
  CreateConfigurationTypeDagmeDto,
  UpdateConfigurationTypeDagmeDto,
} from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateConfigurationTypeDagmeUseCase,
  UpdateConfigurationTypeDagmeUseCase,
  ListConfigurationTypeDagmeUseCase,
  FindByConfigurationTypeDagmeUseCase,
  FindAllDataConfigurationTypeDagmeUseCase,
  DeleteConfigurationTypeDagmeUseCase
} from 'src/application/ag_configuration_type_dagme/use-cases/index.use-case'
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-type-dagme')
export class ConfigurationTypeDagmeController {
  constructor(
    private readonly createConfigurationTypeDagmeUseCase : CreateConfigurationTypeDagmeUseCase,
    private readonly updateConfigurationTypeDagmeUseCase : UpdateConfigurationTypeDagmeUseCase,
    private readonly listConfigurationTypeDagmeUseCase : ListConfigurationTypeDagmeUseCase,
    private readonly findByConfigurationTypeDagmeUseCase : FindByConfigurationTypeDagmeUseCase,
    private readonly findAllDataConfigurationTypeDagmeUseCase : FindAllDataConfigurationTypeDagmeUseCase,
    private readonly deleteConfigurationTypeDagmeUseCase : DeleteConfigurationTypeDagmeUseCase,
  ) {}

  @Post()
  create(
    @Body() createConfigurationTypeDagmeDto: CreateConfigurationTypeDagmeDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId,};
    return this.createConfigurationTypeDagmeUseCase.execute(
      createConfigurationTypeDagmeDto, 
      user)
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationTypeDagmeUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationTypeDagmeUseCase.execute();
  }

@Get(':id')
  findOne(@Param('id') id: string) {
    const viewId: FindByUuid = {uuid: id,};
    return this.findByConfigurationTypeDagmeUseCase.execute(viewId);
}


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateConfigurationTypeDagmeDto: UpdateConfigurationTypeDagmeDto,
  ) {
    const updateId: FindByUuid = {uuid: id,};
    const user: FindById = {id:req.user.userId,};
    return this.updateConfigurationTypeDagmeUseCase.execute(
      updateId,
      updateConfigurationTypeDagmeDto, 
      user
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Request() req,
  ) {
    const deleteId: FindByUuid = {uuid: id,};
    const user: FindById = {id:req.user.userId,};
    return this.deleteConfigurationTypeDagmeUseCase.execute(deleteId,  user);
  }

}
