/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import { ConfigurationParameter } from 'src/domain/cc_configuration_parameter/entities/parameter.entity';
import { ConfigurationStandard } from 'src/domain/cc_configuration_standard/entities/standard.entity';
import { 
  CreateLimitDto,
  UpdateLimitDto
} from 'src/presentation/dtos/cc_configuration_limit/index-limit.dto';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('cc_configuration_limit')
export class ConfigurationLimit extends BaseEntity{

  @Column({ type: 'decimal', nullable: true, default: null })
  minValue: number;

  @Column({ type: 'decimal', nullable: true, default: null })
  maxValue: number;

  @Column({ type: 'decimal', nullable: true, default: null })
  absoluteValue: number;

  @Column({ nullable: true, default: null })
  conditionalValue: string;

  @Column({ nullable: true, default: null })
  specialCondition: string;

  // relación limites N-1 normativa.
  @ManyToOne(() => ConfigurationStandard, (standard) => standard.limits)
  @JoinColumn({ name: 'standard_id' }) // llave foranea
  standard: ConfigurationStandard;

  // relación limites N-1 parametro.
  @ManyToOne(() => ConfigurationParameter, (parameter) => parameter.limits)
  @JoinColumn({ name: 'parameter_id' }) //llave foranea
  parameter: ConfigurationParameter;

  constructor(data?: Partial<ConfigurationParameter>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: CreateLimitDto,
    parameter: ConfigurationParameter,
    standard: ConfigurationStandard,
    userId: number,
  ): ConfigurationLimit {
    const entities = new ConfigurationLimit();
    entities.minValue = dto.minValue;
    entities.maxValue = dto.maxValue;
    entities.absoluteValue = dto.absoluteValue;
    entities.conditionalValue = dto.conditionalValue;
    entities.specialCondition = dto.specialCondition;
    entities.parameter = parameter;
    entities.standard = standard;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateLimitDto, userId: number) {
    this.minValue = dto.minValue;
    this.maxValue = dto.maxValue;
    this.absoluteValue = dto.absoluteValue;
    this.conditionalValue = dto.conditionalValue;
    this.specialCondition = dto.specialCondition;
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  delete(user: number) {
    this.deleteUserId = user;
    this.deleteAt = new Date();
  }

  list() {
    return {
      id: this.id,
      minValue: this.minValue,
      maxValue: this.maxValue,
      absoluteValue: this.absoluteValue,
      conditionalValue: this.conditionalValue,
      specialCondition: this.specialCondition,
      standard: this.standard,
      parameter: this.parameter,
      createAt: formatDate(this.createAt.toString()),
    };
  }
}
