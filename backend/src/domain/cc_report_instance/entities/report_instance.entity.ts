/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import {
  ReportTemplate,
  ChainOfCustody,
} from 'src/domain/shared/index.entity';
import { formatDate } from 'src/common/utils/date.utils';
import { TestType } from '../enum/test_type'
import { WaterTypeCode } from '../enum/water_code'
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('cc_report_instance')
export class ReportInstance extends BaseEntity {

  @Column()
  codeCustody: string;

  @Column()
  reportCode: string;

  @Column()
  reportYear: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: TestType,
  })
  testType: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: WaterTypeCode,
  })
  waterCode: string;

  @Column({ nullable: true })
  testRegistrationCode: string;

  @ManyToOne(() => ReportTemplate)
  @JoinColumn({ name: 'template_id' })
  template: ReportTemplate;

  @Column({ type: 'jsonb', nullable: true })
  summary: object;

  @Column({ nullable: true })
  statusReport: string;

  @ManyToOne(() => ChainOfCustody, (chainOfCustody) => chainOfCustody.reports)
  @JoinColumn({ name: 'custody_id' })
  chainOfCustody: ChainOfCustody;

  constructor(data?: Partial<ReportInstance>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: {
      codeCustody: string,
      reportCode: string,
      reportYear: number,
      testType: string,
      testRegistrationCode: string,
      waterCode: string,
      summary: object,
      statusReport: string
    },
    chainOfCustody: ChainOfCustody,
    userId: number,
  ): ReportInstance {
    return new ReportInstance({
      ...dto,
      chainOfCustody,
      createUserId: userId,
      createAt: new Date()
    })
  }

  softDelete(userId: number): void {
    this.deleteUserId = userId;
    this.deleteAt = new Date();
  }

  toResponse() {
    return {
      id: this.id,
      codeCustody: this.codeCustody.toUpperCase(),
      reportCode: this.reportCode.toUpperCase(),
      reportYear: this.reportYear,
      testType: this.testType.toUpperCase(),
      waterCode: this.waterCode.toUpperCase(),
      testRegistrationCode: this.testRegistrationCode,
      statusReport: this.statusReport,
      summary: this.summary,
      createAt: formatDate(this.createAt.toString()),
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
    };
  }
}
