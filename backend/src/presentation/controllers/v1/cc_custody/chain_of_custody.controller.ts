/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
  Query,
  Res,
} from '@nestjs/common';
import { 
  CreateChainOfCustodyDto, 
  UpdateChainOfCustodyDto 
} from 'src/presentation/dtos/cc_custody/index.dto';
import { 
  JwtAuthGuard,
  RolesGuard
} from 'src/infrastructure/auth/guards/index.guard';
import { 
  FindById, 
  GenerateReportDto 
} from 'src/common/dto/index.dto';
import { Response } from 'express';
import {
  CreateCustodyUseCase,
  DeleteCustodyUseCase,
  GetMapsCustodyUseCase,
  ListCustodyUseCase,
  PrintCustodyUseCase,
  PrintPdfCustodyUseCase,
  UpdateCustodyUseCase,
  FindByIdCustodyUseCase
} from 'src/application/cc_custody/use-cases/index-custody.use-case';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/chain-of-custody')
export class ChainOfCustodyController {
  constructor(
    private readonly createCustodyUseCase: CreateCustodyUseCase,
    private readonly deleteCustodyUseCase: DeleteCustodyUseCase,
    private readonly getMapsCustodyUseCase: GetMapsCustodyUseCase,
    private readonly listCustodyUseCase: ListCustodyUseCase,
    private readonly printCustodyUseCase: PrintCustodyUseCase,
    private readonly printPdfCustodyUseCase: PrintPdfCustodyUseCase,
    private readonly updateCustodyUseCase: UpdateCustodyUseCase,
    private readonly findByIdCustodyUseCase: FindByIdCustodyUseCase
  ) { }

  @Post()
  create(
    @Body() createChainOfCustodyDto: CreateChainOfCustodyDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.createCustodyUseCase.execute(createChainOfCustodyDto, userId);
  }

  @Get()
  findAll() {
    return this.listCustodyUseCase.execute();
  }

  @Get('findById')
  findOne(
    @Query() findById: FindById) {
    return this.findByIdCustodyUseCase.execute(findById);
  }

  @Get('print-chain-of-custody')
  printChainOfCutody(
    @Query() findById: FindById
  ) {
    return this.printCustodyUseCase.execute(findById);
  }

  @Get('getMaps/layout')
  getMaps() {
    return this.getMapsCustodyUseCase.execute()
  }

  @Get('print/generateReportPDF')
  async generateHeader(
    @Res() res: Response,
    @Query() findById: GenerateReportDto
  ) {
    return await this.printPdfCustodyUseCase.execute(res, findById)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChainOfCustodyDto: UpdateChainOfCustodyDto,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.updateCustodyUseCase.execute(+id, updateChainOfCustodyDto, userId);
  }

  @Delete(':id')
  remove(
    @Query() findById: FindById,
    @Request() req
  ) {
    const userId: number = req.user.userId;
    return this.deleteCustodyUseCase.execute(findById, userId);
  }
}
