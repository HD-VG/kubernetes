import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query } from '@nestjs/common';
import { UpdateReporterDto } from 'src/presentation/dtos/ag_reporter/update-reporter.dto';
import { CreateReporterDto } from 'src/presentation/dtos/ag_reporter/create-reporter.dto';
import { 
  CreateReporterUseCase ,
  UpdateReporterUseCase ,
  DeleteReporterUseCase ,
  ListReporterUseCase ,
  FindByIdReporterUseCase } from 'src/application/ag_reporter/use-cases/index.use.case';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { FindByUuid,FindById} from 'src/common/dto/index.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/reporter')
export class ReporterController {
  constructor(
    private readonly createReporterUseCase: CreateReporterUseCase,
    private readonly updateReporterUseCase: UpdateReporterUseCase,
    private readonly deleteReporterUseCase: DeleteReporterUseCase,
    private readonly listReporterUseCase: ListReporterUseCase,
    private readonly findByIdReporterUseCase: FindByIdReporterUseCase,

  ) {}

  @Post()
    create(@Body() createReporterDto: CreateReporterDto, @Request() req) {
      const userId: FindById = { id: req.user.userId };
      return this.createReporterUseCase.execute(createReporterDto, userId);
    }
  
    // @Get('index')
    // findAll(@Query() paginationDto: PaginationDto) {
    //   return this.listReporterUseCase.execute(paginationDto);
    // }
  
    @Get()
    findAllData() {
      return this.listReporterUseCase.execute();
    }
  
    // @Get('last-coste')
    // findLastCoste() {
    //   return this.ReporterService.findLastCoste();
    // }
  
    @Get(':id')
    findOne(@Param('id') uid: string) {
      const viewId: FindByUuid = {uuid: uid};
      return this.findByIdReporterUseCase.execute(viewId);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, 
    @Body() updateReporterDto: UpdateReporterDto,
    @Request()  req,
    ) {
      const updateId: FindByUuid = {uuid: id};
      const user : FindById = { id: req.user.userId };
      return this.updateReporterUseCase.execute(updateId,updateReporterDto,user);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string, 
    @Request()  req,
    ) {
      const deleteId: FindByUuid = {uuid: id,}
      const user : FindById = { id: req.user.userId };
      return this.deleteReporterUseCase.execute(deleteId,user);
    }
}
