/* eslint-disable prettier/prettier */
import { formatDate } from 'src/common/utils/date.utils';
import {
  Column,
  Entity,
  OneToOne,
} from 'typeorm';
import { ChainOfCustody } from 'src/domain/shared/index.entity'
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('cc_configuration_version')
export class ConfigurationVersion extends BaseEntity{

  @Column()
  codeConfiguration: string;

  @Column()
  versionConfiguration: string;

  @Column()
  messageConfiguration: string;

  @Column()
  statusConfiguration: boolean;

  @OneToOne(() => ChainOfCustody, (chainOfCustody) => chainOfCustody.configurationVersion)
  chainOfCustody: ChainOfCustody;

  constructor(data?: Partial<ConfigurationVersion>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: {
      codeConfiguration: string;
      versionConfiguration: string;
      messageConfiguration: string;
    },
    userId: number,
  ): ConfigurationVersion {
    const entity = new ConfigurationVersion();
    entity.codeConfiguration = dto.codeConfiguration.toUpperCase();
    entity.versionConfiguration = dto.versionConfiguration.toUpperCase();
    entity.messageConfiguration = dto.messageConfiguration.toUpperCase();
    entity.statusConfiguration = true;
    entity.createUserId = userId;
    entity.createAt = new Date();
    return entity;
  }

  update(
    dto: Partial<{
      codeConfiguration: string;
      versionConfiguration: string;
      messageConfiguration: string;
    }>,
    userId: number,
  ) {
    if (dto.codeConfiguration)
      this.codeConfiguration = dto.codeConfiguration.toUpperCase();
    if (dto.versionConfiguration)
      this.versionConfiguration = dto.versionConfiguration.toUpperCase();
    if (dto.messageConfiguration)
      this.messageConfiguration = dto.messageConfiguration.toUpperCase();
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  softDelete(userId: number) {
    if (this.deleteAt) {
      throw new Error('Este registro ya fue eliminado');
    }

    this.deleteAt = new Date();
    this.deleteUserId = userId;
    this.statusConfiguration = false;
  }

  desactive(userId: number) {
    this.updateUserId = userId;
    this.updateAt = new Date();
    this.statusConfiguration = false
  }

  active(userId: number) {
    this.updateUserId = userId;
    this.updateAt = new Date();
    this.statusConfiguration = true
  }

  get isActive(): boolean {
    return this.statusConfiguration;
  }


  toResponse() {
    return {
      id: this.id,
      codeConfiguration: this.codeConfiguration,
      versionConfiguration: this.versionConfiguration,
      messageConfiguration: this.messageConfiguration,
      statusConfiguration: this.statusConfiguration,
      createAt: formatDate(this.createAt.toString()),
    }
  }
}
