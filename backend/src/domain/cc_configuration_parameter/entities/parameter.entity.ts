/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import { ConfigurationLimit } from 'src/domain/cc_configuration_limit/entities/limit.entity';
import { 
  CreateParameterDto,
  UpdateParameterDto
} from 'src/presentation/dtos/cc_configuration_parameter/index-parameter.dto'
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('cc_configuration_parameter')
export class ConfigurationParameter extends BaseEntity {

  @Column()
  name: string;

  @Column({ nullable: true })
  unit: string;

  @Column()
  testMethod: string;

  @Column()
  testCode: string;

  //relacion parametros 1-N limites
  @OneToMany(() => ConfigurationLimit, (limit) => limit.parameter)
  limits: ConfigurationLimit[];

  constructor(data?: Partial<ConfigurationParameter>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto: CreateParameterDto, userId: number): ConfigurationParameter {
    const entities = new ConfigurationParameter();
    entities.name = dto.name.toUpperCase();
    entities.unit = dto.unit.toUpperCase();
    entities.testMethod = dto.testMethod.toUpperCase();
    entities.testCode = dto.testCode.toUpperCase();
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateParameterDto, userId: number) {
    this.name = dto.name.toUpperCase();
    this.unit = dto.unit.toUpperCase();
    this.testMethod = dto.testMethod.toUpperCase();
    this.testCode = dto.testCode.toUpperCase();
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
      name: this.name,
      unit: this.unit,
      testMethod: this.testMethod,
      testCode: this.testCode,
      createAt: formatDate(this.createAt.toString()),
    };
  }
}
