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
  CreateConfigurationTypeMaterialDto,
  UpdateConfigurationTypeMaterialDto,
} from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { 
  CreateConfigurationTypeMaterialUseCase,
  UpdateConfigurationTypeMaterialUseCase,
  ListConfigurationTypeMaterialUseCase,
  FindByConfigurationTypeMaterialUseCase,
  FindAllDataConfigurationTypeMaterialUseCase,
  DeleteConfigurationTypeMaterialUseCase,
  GetApiMaterialUseCase,
} from 'src/application/ag_configuration_type_material/use-cases/index.use-case'
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-type-material')
export class ConfigurationTypeMaterialController {
  constructor(
    private readonly createConfigurationTypeMaterialUseCase : CreateConfigurationTypeMaterialUseCase,
    private readonly updateConfigurationTypeMaterialUseCase : UpdateConfigurationTypeMaterialUseCase,
    private readonly listConfigurationTypeMaterialUseCase : ListConfigurationTypeMaterialUseCase,
    private readonly findByConfigurationTypeMaterialUseCase : FindByConfigurationTypeMaterialUseCase,
    private readonly findAllDataConfigurationTypeMaterialUseCase : FindAllDataConfigurationTypeMaterialUseCase,
    private readonly deleteConfigurationTypeMaterialUseCase : DeleteConfigurationTypeMaterialUseCase,
    private readonly getApiMaterialUseCase :   GetApiMaterialUseCase,
  ) {}

  @Post()
  create(
    @Body()
    createConfigurationTypeMaterialDto: CreateConfigurationTypeMaterialDto,
    @Request() req,
  ) {
    const user : FindById = {id: req.user.userId};
    return this.createConfigurationTypeMaterialUseCase.execute(
      createConfigurationTypeMaterialDto,
      user,
    );
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationTypeMaterialUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationTypeMaterialUseCase.execute();
  }

  @Get('poseidon')
  findAllDataApi() {
    return this.getApiMaterialUseCase.execute();
  }
  @Get(':id')
    findOne(@Param('id') id: string) {
      const viewId: FindByUuid = {uuid: id };
      return this.findByConfigurationTypeMaterialUseCase.execute(viewId);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateConfigurationTypeMaterialDto: UpdateConfigurationTypeMaterialDto,
    @Request() req
  ) {
    const updateId: FindByUuid = {uuid: id };
    const user : FindById = {id: req.user.userId};
    return this.updateConfigurationTypeMaterialUseCase.execute(
      updateId,
      updateConfigurationTypeMaterialDto,
      user,
    );
  }

  @Delete(':id')
    remove(
      @Param('id') id: string,
      @Request() req,
    ) {
      const deleteId: FindByUuid = {uuid: id };
      const user : FindById = {id: req.user.userId};;
      return this.deleteConfigurationTypeMaterialUseCase.execute(deleteId, user);
    }
}
