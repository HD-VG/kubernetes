/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import { Sampling, ReportInstance, ConfigurationVersion, Applicant, Transport } from 'src/domain/shared/index.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
@Entity('cc_custody')
export class ChainOfCustody extends BaseEntity{

  @Column({ nullable: true })
  codeCustody: string;

  @Column()
  laboratoryMB: boolean;

  @Column()
  laboratoryFQ: boolean;

  @Column()
  codeThermohygrometer: string;

  @Column()
  codeThermometerMM: string;

  @Column()
  codeThermometer: string;

  @Column()
  codeColorimeter: string;

  @Column({ nullable: true })
  initialConservative: string;

  @ManyToOne(() => ConfigurationVersion, { nullable: false })
  @JoinColumn({ name: 'configuration_version_id' })
  configurationVersion: ConfigurationVersion;

  @OneToMany(() => Sampling, (sampling) => sampling.chainOfCustody, { cascade: true })
  samplings: Sampling[];

  @OneToMany(() => ReportInstance, (report) => report.chainOfCustody, { cascade: true })
  reports: ReportInstance[];

  @OneToOne(() => Applicant, applicant => applicant.chainOfCustody, { cascade: true, nullable: true })
  applicant: Applicant;

  @OneToOne(() => Transport, transport => transport.chainOfCustody, { cascade: true, nullable: true })
  transport: Transport;

  constructor(data?: Partial<ChainOfCustody>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: {
      laboratoryMB: boolean;
      laboratoryFQ: boolean;
      codeThermohygrometer: string;
      codeThermometerMM: string;
      codeThermometer: string;
      codeColorimeter: string;
      initialConservative?: string;
    },
    userId: number,
    configurationVersion: ConfigurationVersion,
    sequence: number,
  ): ChainOfCustody {
    const entity = new ChainOfCustody();
    entity.codeCustody = `DCCE - ${sequence}`;
    entity.laboratoryMB = dto.laboratoryMB;
    entity.laboratoryFQ = dto.laboratoryFQ;
    entity.codeThermohygrometer = dto.codeThermohygrometer.toUpperCase();
    entity.codeThermometerMM = dto.codeThermometerMM.toUpperCase();
    entity.codeThermometer = dto.codeThermometer.toUpperCase();
    entity.codeColorimeter = dto.codeColorimeter.toUpperCase();
    entity.initialConservative = dto.initialConservative?.toUpperCase();
    entity.configurationVersion = configurationVersion;
    entity.createUserId = userId;
    entity.createAt = new Date();
    return entity;
  }

  updateData(
    dto: Partial<{
      laboratoryMB: boolean;
      laboratoryFQ: boolean;
      codeThermohygrometer: string;
      codeThermometerMM: string;
      codeThermometer: string;
      codeColorimeter: string;
      initialConservative: string;
    }>,
    userId: number,
  ) {
    if (dto.laboratoryMB !== undefined)
      this.laboratoryMB = dto.laboratoryMB;
    if (dto.laboratoryFQ !== undefined)
      this.laboratoryFQ = dto.laboratoryFQ;
    if (dto.codeThermohygrometer)
      this.codeThermohygrometer = dto.codeThermohygrometer.toUpperCase();
    if (dto.codeThermometerMM)
      this.codeThermometerMM = dto.codeThermometerMM.toUpperCase();
    if (dto.codeThermometer)
      this.codeThermometer = dto.codeThermometer.toUpperCase();
    if (dto.codeColorimeter)
      this.codeColorimeter = dto.codeColorimeter.toUpperCase();
    if (dto.initialConservative)
      this.initialConservative = dto.initialConservative.toUpperCase();

    this.updateUserId = userId;
    this.updateAt = new Date();
  }
  softDelete(userId: number) {
    if (this.deleteAt) {
      throw new Error('Este registro ya fue eliminado');
    }

    this.deleteAt = new Date();
    this.deleteUserId = userId;
  }

  isActive(): boolean {
    return this.deleteAt === null;
  }
  toResponse() {
    return {
      id: this.id,
      codeCustody: this.codeCustody,
      laboratoryMB: this.laboratoryMB,
      laboratoryFQ: this.laboratoryFQ,
      codeThermohygrometer: this.codeThermohygrometer,
      codeThermometerMM: this.codeThermometerMM,
      codeThermometer: this.codeThermometer,
      codeColorimeter: this.codeColorimeter,
      initialConservative: this.initialConservative,
      createAt: formatDate(this.createAt.toString()),
    };
  }
}
