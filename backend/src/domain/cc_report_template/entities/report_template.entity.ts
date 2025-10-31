/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatTime } from 'src/common/utils/date.utils';
import {
  Column,
  Entity,
} from 'typeorm';

@Entity('cc_report_template')
export class ReportTemplate extends BaseEntity {

  @Column({ nullable: true })
  codeCustody: string;

  @Column()
  typeCode: string;

  @Column()
  codeReport: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  expectedParameters: string[];

  @Column({ default: false })
  statusReport: boolean;

  constructor(data?: Partial<ReportTemplate>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: { codeCustody: string, typeCode: string; codeReport: string, name: string; expectedParameters: string[]; statusReport: boolean },
    userId: number
  ): ReportTemplate {
    return new ReportTemplate({
      ...dto,
      createUserId: userId,
      createAt: new Date(),
    });
  }

  update(
    dto: Partial<{ codeCustody: string, typeCode: string; codeReport: string, name: string; expectedParameters: string[]; statusReport: boolean }>,
    userId: number
  ): void {
    if (dto.codeCustody !== undefined) this.codeCustody = dto.codeCustody;
    if (dto.typeCode !== undefined) this.typeCode = dto.typeCode;
    if (dto.codeReport !== undefined) this.codeReport = dto.codeReport;
    if (dto.name !== undefined) this.name = dto.name;
    if (dto.expectedParameters !== undefined) this.expectedParameters = dto.expectedParameters;
    if (dto.statusReport !== undefined) this.statusReport = dto.statusReport;
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
      codeCustody: this.codeCustody.toUpperCase(),
      typeCode: this.typeCode.toUpperCase(),
      codeReport: this.codeReport.toUpperCase(),
      name: this.name.toUpperCase(),
      expectedParameters: this.expectedParameters,
      statusReport: this.statusReport,
      created_at: formatTime(this.createAt.toString()),
      updated_at: formatTime(this.updateAt.toString()),
    };
  }
}

