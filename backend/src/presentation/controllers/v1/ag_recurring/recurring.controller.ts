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
  CreateRecurringDto,
  UpdateRecurringDto,
} from 'src/presentation/dtos/ag_recurring/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateRecurringUseCase,
  UpdateRecurringUseCase,
  ListRecurringUseCase,
  FindByRecurringUseCase,
  FindAllDataRecurringUseCase,
  DeleteRecurringUseCase
} from 'src/application/ag_recurring/use-cases/index.use-case'
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/recurring')
export class RecurringController {
  constructor(
    private readonly createRecurringUseCase : CreateRecurringUseCase,
    private readonly updateRecurringUseCase : UpdateRecurringUseCase,
    private readonly listRecurringUseCase : ListRecurringUseCase,
    private readonly findByRecurringUseCase : FindByRecurringUseCase,
    private readonly findAllDataRecurringUseCase : FindAllDataRecurringUseCase,
    private readonly deleteRecurringUseCase : DeleteRecurringUseCase,
  ) {}

  @Post()
  create(
    @Body() createRecurringDto: CreateRecurringDto,
    @Request() req,
  ) {
    const user: FindById = {id:req.user.userId};
    return this.createRecurringUseCase.execute(
      createRecurringDto, 
      user)
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.listRecurringUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.findAllDataRecurringUseCase.execute();
  }

@Get(':id')
  findOne(@Param('id') id: string) {
    const viewId: FindByUuid = {uuid: id};
    return this.findByRecurringUseCase.execute(viewId);
}


  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateRecurringDto: UpdateRecurringDto,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user: FindById = {id:req.user.userId};
    return this.updateRecurringUseCase.execute(
      updateId,
      updateRecurringDto, 
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
    return this.deleteRecurringUseCase.execute(deleteId,  user);
  }

}
