import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { CreateReportedDto } from 'src/presentation/dtos/ag_reported/create-reported.dto';
import { UpdateReportedDto } from 'src/presentation/dtos/ag_reported/update-reported.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { CreateReportedUseCase ,
  DeleteReportedUseCase ,
  UpdateReportedUseCase ,
  ListReportedUseCase ,
  FindByIdReportedUseCase ,
  IndexReportedUseCase } from 'src/application/ag_reported/use-cases/index.use-case';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindById,FindByUuid } from 'src/common/dto/index.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/reported')
export class ReportedController {
  constructor(
    private readonly createReportedUseCase: CreateReportedUseCase,
    private readonly updateReportedUseCase: UpdateReportedUseCase,
    private readonly deleteReportedUseCase: DeleteReportedUseCase,
    private readonly listReportedUseCase: ListReportedUseCase,
    private readonly findByIdReportedUseCase: FindByIdReportedUseCase,
    private readonly indexReportedUseCase: IndexReportedUseCase,
  ) {}

  @Post()
  create(@Body() createReportedDto: CreateReportedDto, @Request() req) {
    const user : FindById = { id: req.user.userId };
    return this.createReportedUseCase.execute(createReportedDto, user);
  }

  @Get('index')
  findAll(@Query() paginationDto: PaginationDto) {
    return this.indexReportedUseCase.execute(paginationDto);
  }

  @Get()
  findAllData() {
    return this.listReportedUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const viewId: FindByUuid = {uuid: id};
    return this.findByIdReportedUseCase.execute(viewId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReportedDto: UpdateReportedDto,
    @Request() req,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user : FindById = { id: req.user.userId };
    return this.updateReportedUseCase.execute(updateId, updateReportedDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id:string, @Request() req) {
    const deleteId: FindByUuid = {uuid: id};
    console.log("su id ", deleteId)
    const user : FindById = { id: req.user.userId };
    return this.deleteReportedUseCase.execute(deleteId, user);
  }
}
