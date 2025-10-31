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
import { CreateApplicantDto, UpdateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { JwtAuthGuard, RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import {
  CreateApplicantUseCase,
  DeleteApplicantUseCase,
  FindByIdApplicantUseCase,
  ListApplicantUseCase,
  UpdateApplicantUseCase
} from 'src/application/cc_applicant/use-cases/index-applicant.use-case'

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/applicant')
export class ApplicantController {
  constructor(
    private readonly createApplicantUseCase: CreateApplicantUseCase,
    private readonly deleteApplicantUseCase: DeleteApplicantUseCase,
    private readonly findByIdApplicantUseCase: FindByIdApplicantUseCase,
    private readonly listApplicantUseCase: ListApplicantUseCase,
    private readonly updateApplicantUseCase: UpdateApplicantUseCase,
  ) { }

  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.createApplicantUseCase.execute(createApplicantDto, userId);
  }

  @Get('list')
  findAll(@Query() findById: FindById) {
    return this.listApplicantUseCase.execute(findById);
  }

  @Get('findById')
  findOne(@Query() findById: FindById) {
    return this.findByIdApplicantUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateApplicantDto: UpdateApplicantDto,
    @Request() req,
  ) {
    const userId: number = req.user.userId;
    return this.updateApplicantUseCase.execute(+id, updateApplicantDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteApplicantUseCase.execute(findById, userId);
  }
}
