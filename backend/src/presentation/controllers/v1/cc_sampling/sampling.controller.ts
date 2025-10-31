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
  CreateSamplingDto, 
  UpdateSamplingDto, 
  UpdateSamplingLaboratoryDto 
} from 'src/presentation/dtos/cc_sampling/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { 
  JwtAuthGuard,
  RolesGuard
} from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateSamplingUseCase,
  DeleteSamplingUseCase,
  FindByIdtSamplingUseCase,
  ListSamplingUseCase,
  UpdateLaboratorySamplingUseCase,
  UpdateSamplingUseCase
} from 'src/application/cc_sampling/use-cases/index.use-case'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/sampling')
export class SamplingController {
  constructor(
    private readonly createSamplingUseCase: CreateSamplingUseCase,
    private readonly deleteSamplingUseCase: DeleteSamplingUseCase,
    private readonly findByIdtSamplingUseCase: FindByIdtSamplingUseCase,
    private readonly listSamplingUseCase: ListSamplingUseCase,
    private readonly updateLaboratorySamplingUseCase: UpdateLaboratorySamplingUseCase,
    private readonly updateSamplingUseCase: UpdateSamplingUseCase,
  ) { }

  @Post()
  create(
    @Body() createSamplingDto: CreateSamplingDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.createSamplingUseCase.execute(createSamplingDto, userId);
  }

  @Get('list')
  findAll(@Query() findById: FindById) {
    return this.listSamplingUseCase.execute(findById);
  }

  @Get('findById')
  findOne(@Query() findById: FindById) {
    return this.findByIdtSamplingUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSamplingDto: UpdateSamplingDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.updateSamplingUseCase.execute(+id, updateSamplingDto, userId);
  }

  @Patch('laboratory/:id')
  updateLaboratory(
    @Param('id') id: string,
    @Body() updateSamplingDto: UpdateSamplingLaboratoryDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.updateLaboratorySamplingUseCase.execute(
      +id, 
      updateSamplingDto, 
      userId
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query() findById: FindById,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.deleteSamplingUseCase.execute(findById, userId);
  }
}
