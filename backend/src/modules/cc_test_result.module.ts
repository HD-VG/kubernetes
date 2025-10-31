/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TestResultService } from '../infrastructure/cc_test_result/services/test_result.service';
import { TestResultController } from '../presentation/controllers/v1/cc_test_result/test_result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainOfCustody, ConfigurationCalculation, ConfigurationLimit, Sampling, TestResult } from 'src/domain/shared/index.entity';
import { ITestResultRepositoryToken } from 'src/application/cc_test_result/tokens/test-result-repository.tokens';
import { TestResultRepository } from 'src/infrastructure/cc_test_result/repositories/test_result.repository';
import {
  CreateTestResultUseCase,
  DeleteTestResultUseCase,
  FindByIdTestResultUseCase,
  ListBySamplingTestResultUseCase,
  UpdateTestResultUseCase,
  ListByCustodyTestResultUseCase
} from 'src/application/cc_test_result/use-case/index.use-case';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TestResult, ConfigurationCalculation, Sampling, ChainOfCustody, ConfigurationLimit]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [TestResultController],
  providers: [
    TestResultService,
    {
      provide: ITestResultRepositoryToken,
      useClass: TestResultRepository,
    },
    CreateTestResultUseCase,
    DeleteTestResultUseCase,
    FindByIdTestResultUseCase,
    ListBySamplingTestResultUseCase,
    UpdateTestResultUseCase,
    ListByCustodyTestResultUseCase,
  ],
  exports: [TestResultService],
})
export class TestResultModule { }
