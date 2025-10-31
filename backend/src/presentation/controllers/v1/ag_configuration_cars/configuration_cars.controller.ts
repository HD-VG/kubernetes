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
import { CreateConfigurationCarDto, UpdateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
import { 
  CreateConfigurationCarsUseCase,
  UpdateConfigurationCarsUseCase,
  ListConfigurationCarsUseCase,
  FindByConfigurationCarsUseCase,
  FindAllDataConfigurationCarsUseCase,
  DeleteConfigurationCarsUseCase, 
  GetApiCarsUseCase,
  GetApiByIdCarsUseCase
} from 'src/application/ag_configuration_cars/use-cases/index.use-case'
import * as dotenv from 'dotenv';
dotenv.config();
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/configuration-cars')
export class ConfigurationCarsController {
  constructor(
    private readonly createConfigurationCarsUseCase : CreateConfigurationCarsUseCase,
    private readonly updateConfigurationCarsUseCase : UpdateConfigurationCarsUseCase,
    private readonly listConfigurationCarsUseCase : ListConfigurationCarsUseCase,
    private readonly findByConfigurationCarsUseCase : FindByConfigurationCarsUseCase,
    private readonly findAllDataConfigurationCarsUseCase : FindAllDataConfigurationCarsUseCase,
    private readonly deleteConfigurationCarsUseCase : DeleteConfigurationCarsUseCase,
    private readonly getApiUseCase : GetApiCarsUseCase,
    private readonly getByIdApiUseCase: GetApiByIdCarsUseCase,
  ) {}

  @Post()
  create(
    @Body() createConfigurationCarsDto: CreateConfigurationCarDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId,};
    return this.createConfigurationCarsUseCase.execute(
      createConfigurationCarsDto, 
      user);
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listConfigurationCarsUseCase.execute(paginationDto);
  }

  @Get('dataRRHH')
  findAllCars() {
    return this.getApiUseCase.execute();
  }

  @Get('dataRRHH/:id')
  findIdCars(@Param('id') id: number) {
      return this.getByIdApiUseCase.execute(id);
  }

  @Get()
  findAllData() {
    return this.findAllDataConfigurationCarsUseCase.execute();
  }

  @Get(':id')
    findOne(@Param('id') id: string) {
      const viewId: FindByUuid = {uuid: id,};
      return this.findByConfigurationCarsUseCase.execute(viewId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateConfigurationCarsDto: UpdateConfigurationCarDto,
  ) {
    const updateId: FindByUuid = {uuid: id,};
    const user: FindById = {id:req.user.userId,};
    return this.updateConfigurationCarsUseCase.execute(
      updateId,
      updateConfigurationCarsDto,
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
      return this.deleteConfigurationCarsUseCase.execute(deleteId,  user);
    }
}
