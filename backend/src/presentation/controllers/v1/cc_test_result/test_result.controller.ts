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
  CreateTestResultDto,
  UpdateTestResultDto,
  ListTestResultDto
} from 'src/presentation/dtos/cc_test_result/index.dto';
import {
  CreateTestResultUseCase,
  DeleteTestResultUseCase,
  FindByIdTestResultUseCase,
  ListBySamplingTestResultUseCase,
  UpdateTestResultUseCase,
  ListByCustodyTestResultUseCase
} from 'src/application/cc_test_result/use-case/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';
import {
  JwtAuthGuard,
  RolesGuard,
} from 'src/infrastructure/auth/guards/index.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('v1/test-result')
export class TestResultController {
  constructor(
    private readonly createTestResultUseCase: CreateTestResultUseCase,
    private readonly deleteTestResultUseCase: DeleteTestResultUseCase,
    private readonly findByIdTestResultUseCase: FindByIdTestResultUseCase,
    private readonly listBySamplingTestResultUseCase: ListBySamplingTestResultUseCase,
    private readonly updateTestResultUseCase: UpdateTestResultUseCase,
    private readonly listByCustodyTestResultUseCase: ListByCustodyTestResultUseCase,
  ) {}

  @Post()
  create(@Body() createTestResultDto: CreateTestResultDto, @Request() req) {
    const userId: number = req.user.userId;
    return this.createTestResultUseCase.execute(createTestResultDto, userId);
  }

  // @Get('list/:sampling_id/:custody_id')
  @Get('list')
  findAll(@Query() dto: ListTestResultDto) {
    return this.listByCustodyTestResultUseCase.execute(dto);
  }

  @Get(':id')
  findOne(@Query() findById: FindById) {
    return this.findByIdTestResultUseCase.execute(findById);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateTestResultDto: UpdateTestResultDto,
  ) {
    const userId: number = req.user.userId;
    return this.updateTestResultUseCase.execute(
      +id,
      updateTestResultDto,
      userId,
    );
  }

  @Delete(':id')
  remove(@Query() findById: FindById, @Request() req) {
    const userId: number = req.user.userId;
    return this.deleteTestResultUseCase.execute(findById, userId);
  }
}
