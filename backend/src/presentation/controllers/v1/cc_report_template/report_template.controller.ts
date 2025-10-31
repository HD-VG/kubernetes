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
  CreateReportTemplateDto,
  UpdateReportTemplateDto,
} from 'src/presentation/dtos/cc_report_template/index.dto';
import {
  CreateReportTemplateUseCase,
  DeleteReportTemplateUseCase,
  FindReportTemplateUseCase,
  ListReportTemplateUseCase,
  UpdateTransportUseCase,
} from 'src/application/cc_report_template/use-case/index-use-case';
import {
  JwtAuthGuard,
  RolesGuard,
} from 'src/infrastructure/auth/guards/index.guard';
import { FindById } from 'src/common/dto/findById.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/report-template')
export class ReportTemplateController {
  constructor(
    private readonly createReportTemplateUseCase: CreateReportTemplateUseCase,
    private readonly deleteReportTemplateUseCase: DeleteReportTemplateUseCase,
    private readonly findReportTemplateUseCase: FindReportTemplateUseCase,
    private readonly listReportTemplateUseCase: ListReportTemplateUseCase,
    private readonly updateTransportUseCase: UpdateTransportUseCase,
  ) {}

  @Post()
  create(
    @Body() createReportTemplateDto: CreateReportTemplateDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.createReportTemplateUseCase.execute(
      createReportTemplateDto,
      userId,
    );
  }

  @Get('list/:code')
  findAll(@Param('code') code: string) {
    return this.listReportTemplateUseCase.execute(code);
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findReportTemplateUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateReportTemplateDto: UpdateReportTemplateDto,
  ) {
    const userId: number = req.user.userId;
    return this.updateTransportUseCase.execute(
      +id,
      updateReportTemplateDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteReportTemplateUseCase.execute(findById, userId);
  }
}
