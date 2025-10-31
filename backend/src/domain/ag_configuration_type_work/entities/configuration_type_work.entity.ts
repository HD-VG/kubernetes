/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { CreateConfigurationTypeWorkDto, UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('ag_configuration_type_work')
export class ConfigurationTypeWork extends BaseEntity{

  @Column()
  name: string;

  @ManyToMany(() => Register, register => register.configurationTypeWorks)
  registers: Register[];

  constructor (data?: Partial<ConfigurationTypeWork>){
    super();
    if(data) Object.assign(this, data);
  }
  static create(dto:CreateConfigurationTypeWorkDto, userId: number ){
    const entities = new ConfigurationTypeWork();
    entities.name = dto.name.toUpperCase();
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateConfigurationTypeWorkDto,userId: number){
    if(dto.name !== null && dto.name !== undefined ){
      this.name = dto.name.toUpperCase();
    }
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this;
  }
  delete(user : number){
    this.deleteUserId= user;
    this.deleteAt = new Date();
    return this;
  }
  getResponse(){
    return  {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
  }
}
