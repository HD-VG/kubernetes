/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Request,
  Query,
  UseGuards,
  Res,
} from '@nestjs/common';
import {
  CreateReportInstanceDto,
} from 'src/presentation/dtos/cc_report_instance/index.dto';
import {
  CreateReportInstanceUseCase,
  DeleteReportInstanceUseCase,
  FindReportInstanceUseCase,
  ListReportInstanceUseCase,
} from 'src/application/cc_report_instance/use-case/index.use-case';
import {
  JwtAuthGuard,
  RolesGuard,
} from 'src/infrastructure/auth/guards/index.guard';
import { FindById } from 'src/common/dto/findById.dto';
import { GenerateReportDto } from 'src/common/dto/findToPrint.dto';
import { Response } from 'express';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/report-instance')
export class ReportInstanceController {
  constructor(
    private readonly createReportInstanceUseCase: CreateReportInstanceUseCase,
    private readonly deleteReportInstanceUseCase: DeleteReportInstanceUseCase,
    private readonly findReportInstanceUseCase: FindReportInstanceUseCase,
    private readonly listReportInstanceUseCase: ListReportInstanceUseCase,
  ) { }

  @Post()
  create(
    @Body() createReportInstanceDto: CreateReportInstanceDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.createReportInstanceUseCase.execute(createReportInstanceDto, userId);
  }

  @Get('by-custody')
  findAll(@Query() findById: FindById) {
    return this.listReportInstanceUseCase.execute(findById);
  }

  @Get('print/get-report-minimun-control-water')
  findOne(
    @Res() res: Response,
    @Query() findById: GenerateReportDto
  ) {
    return this.findReportInstanceUseCase.execute(res, findById);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateReportInstanceDto: UpdateReportInstanceDto,
  // ) {
  //   return this.reportInstanceService.update(+id, updateReportInstanceDto);
  // }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteReportInstanceUseCase.execute(findById, userId);
  }
}
