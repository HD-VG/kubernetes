/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import {
  Sampling,
  ConfigurationCalculation
} from 'src/domain/shared/index.entity';
import { 
  CreateTestResultDto,
  UpdateTestResultDto
} from 'src/presentation/dtos/cc_test_result/index.dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('cc_test_result')
export class TestResult extends BaseEntity{

  @Column()
  parameter: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valueA: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  valueB: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  average: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  result: number;

  @Column({ default: false })
  usedFormula: boolean;

  @ManyToOne(() => ConfigurationCalculation, { nullable: true })
  @JoinColumn({ name: 'configuration_id' })
  configuration: ConfigurationCalculation;

  @ManyToOne(() => Sampling, (sampling) => sampling.testResults)
  @JoinColumn({ name: 'sampling_id' })
  sampling: Sampling;

  constructor(data?: Partial<TestResult>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: CreateTestResultDto,
    userId: number,
    sampling: Sampling,
    config: ConfigurationCalculation | null,
    average: number,
    result: number,
    usedFormula: boolean,
  ): TestResult {
    return new TestResult({
      parameter: dto.parameter,
      valueA: dto.valueA,
      valueB: dto.valueB,
      average,
      result,
      usedFormula,
      configuration: config,
      sampling,
      createUserId: userId,
      createAt: new Date(),
    });
  }

  update(dto: UpdateTestResultDto, userId: number): void {
    this.parameter = dto.parameter ?? this.parameter
    this.valueA = dto.valueA ?? this.valueA
    this.valueB = dto.valueB ?? this.valueB
    // la config y sampling del repo-service
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  softDelete(userId: number): void {
    this.deleteUserId = userId;
    this.deleteAt = new Date();
  }

  toResponse() {
    return {
      id: this.id,
      parameter: this.parameter,
      valueA: this.valueA,
      valueB: this.valueB,
      average: this.average,
      result: this.result,
      usedFormula: this.usedFormula,
      createAt: formatDate(this.createAt.toString()),
      configuration_id: this.configuration?.id,
    };
  }
}
