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
  CreateWaterDto,
  UpdateWaterDto,
} from 'src/presentation/dtos/ag_water/index.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { FindById, PaginationDto } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateWaterUseCase,
  UpdateWaterUseCase,
  ListWaterUseCase,
  FindByWaterUseCase,
  FindAllDataWaterUseCase,
  DeleteWaterUseCase
} from 'src/application/ag_water/use-cases/index.use-case'
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/water')
export class WaterController {
    constructor(
    private readonly createWaterUseCase : CreateWaterUseCase,
    private readonly updateWaterUseCase : UpdateWaterUseCase,
    private readonly listWaterUseCase : ListWaterUseCase,
    private readonly findByWaterUseCase : FindByWaterUseCase,
    private readonly findAllDataWaterUseCase : FindAllDataWaterUseCase,
    private readonly deleteWaterUseCase : DeleteWaterUseCase,
  ) {}

  @Post()
  create(@Body() createWaterDto: CreateWaterDto, @Request() req) {
    const userId: FindById = { id: req.user.userId };
    return this.createWaterUseCase.execute(createWaterDto, userId);
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listWaterUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataWaterUseCase.execute();
  }

  // @Get('last-coste')
  // findLastCoste() {
  //   return this.waterService.findLastCoste();
  // }

  @Get(':id')
  findOne(@Param('id') uid: string) {
    const viewId: FindByUuid = {uuid: uid};
    return this.findByWaterUseCase.execute(viewId);
  }

  @Patch(':id')
  update(@Param('id') id: string, 
  @Body() updateWaterDto: UpdateWaterDto,
  @Request()  req,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user : FindById = { id: req.user.userId };
    return this.updateWaterUseCase.execute(updateId,updateWaterDto,user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, 
  @Request()  req,
  ) {
    const deleteId: FindByUuid = {uuid: id,}
    const user : FindById = { id: req.user.userId };
    return this.deleteWaterUseCase.execute(deleteId,user);
  }
}
