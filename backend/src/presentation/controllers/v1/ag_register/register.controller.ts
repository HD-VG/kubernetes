/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CreateRegisterUseCase,
    DeleteRegisterUseCase, 
    FindByIdRegisterUseCase, 
    ListRegisterUseCase, 
    UpdateRegisterUseCase,
    ChangeStateRegisterUseCase,
    GenerateReportByMonthAndYearRegisterUseCase,
    PrintResumenRegisterUseCase,
    SumAmountByRegisterIdRegisterUseCase,
    SumAmountsByMonthRegisterUseCase,
    PrintRegisterUseCase,
    } from 'src/application/ag_register/use-cases/index.use-case';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { CreateRegisterDto } from 'src/presentation/dtos/ag_register/create-register.dto';
import { UpdateRegisterDto } from 'src/presentation/dtos/ag_register/update-register.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/register')
export class RegisterController {
  constructor(
    private readonly createRegisterUseCase: CreateRegisterUseCase,
    private readonly updateRegisterUseCase: UpdateRegisterUseCase,
    private readonly deleteRegisterUseCase: DeleteRegisterUseCase,
    private readonly listRegisterUserCase: ListRegisterUseCase,
    private readonly findByIdRegisterUseCase: FindByIdRegisterUseCase,
    private readonly changeStateRegisterUseCase: ChangeStateRegisterUseCase,
    private readonly generateReportByMonthAndYearRegisterUseCase: GenerateReportByMonthAndYearRegisterUseCase,
    private readonly printResumenRegisterUseCase: PrintResumenRegisterUseCase,
    private readonly sumAmountByRegisterIdRegisterUseCase: SumAmountByRegisterIdRegisterUseCase,
    private readonly sumAmountsByMonthRegisterUseCase: SumAmountsByMonthRegisterUseCase,
    private readonly printRegisterUseCase: PrintRegisterUseCase,
  ) {}

  @Post()
  create(
    @Body() createRegisterDto: CreateRegisterDto, 
    @Request() req) {
    const user: FindById = {id:req.user.userId};
    return this.createRegisterUseCase.execute(
      createRegisterDto,
      user,
    );
  }

  @Get()
  findAll() {
    return this.listRegisterUserCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string) 
  {
    const viewId: FindByUuid = {uuid: id};
    return this.findByIdRegisterUseCase.execute( viewId );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegisterDto: UpdateRegisterDto,
    @Request() req,
  ) {
    const updateId: FindByUuid = {uuid: id};
    const user: FindById = {id:req.user.userId};
    return this.updateRegisterUseCase.execute(
      updateId,
      updateRegisterDto,
      user
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const deleteId: FindByUuid = {uuid: id};
    const user: FindById = {id:req.user.userId};
    return this.deleteRegisterUseCase.execute(deleteId, user);
  }
  ///////////////////////////////////////////////////////////////
  @Get('change_state/:id')
  changeState(@Param('id') id: string) {
    const changeStateId: FindByUuid = {uuid: id};
    return this.changeStateRegisterUseCase.execute(changeStateId);
  }
  @Get('print/:id')
  printRegister(@Param('id') id: string) {
    const printId: FindByUuid = {uuid: id};
    return this.printRegisterUseCase.execute(printId);
  }
  @Get('resumen/:id')
  printResumen(@Param('id') id: string) {
    const resumenId: FindByUuid = {uuid: id};
    return this.printResumenRegisterUseCase.execute(resumenId);
  }
  @Get('getDashboard/chart1')
  getDashboard() {
    return this.sumAmountsByMonthRegisterUseCase.execute();
  }  
  @Get('getLetter/:id')
  getLetter(@Query('id') id: string){
    const getLetterId: FindByUuid = {uuid: id};
    return this.sumAmountByRegisterIdRegisterUseCase.execute(getLetterId);
  }
  
  @Get('generateReportByMonthAndYear/:month/:year')
  generateReportByMonthAndYear(
    @Param('month') month: number,
    @Param('year') year: number
  ){
    return this.generateReportByMonthAndYearRegisterUseCase.execute(month, year)
  }
}
