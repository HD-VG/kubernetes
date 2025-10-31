/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import { ConfigurationLimit } from 'src/domain/cc_configuration_limit/entities/limit.entity';
import {
  CreateStandardDto,
  UpdateStandardDto
} from 'src/presentation/dtos/cc_configuration_standard/index-standard.dto';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('cc_configuration_standard')
export class ConfigurationStandard extends BaseEntity{

  @Column()
  name: string;

  @Column()
  type: string;

  // reacion standard 1-N limites
  @OneToMany(() => ConfigurationLimit, (limit) => limit.standard)
  limits: ConfigurationLimit[];

  constructor(data?: Partial<ConfigurationStandard>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto: CreateStandardDto, userId: number): ConfigurationStandard {
    const entities = new ConfigurationStandard();
    entities.name = dto.name.toUpperCase();
    entities.type = dto.type.toUpperCase();
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateStandardDto, userId: number) {
    this.name = dto.name.toUpperCase();
    this.type = dto.type.toUpperCase();
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
      type: this.type,
      createAt: formatDate(this.createAt.toString()),
    };
  }
}
