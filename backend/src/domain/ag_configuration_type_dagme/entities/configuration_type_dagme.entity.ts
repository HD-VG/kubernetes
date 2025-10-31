/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { CreateConfigurationTypeDagmeDto, UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('ag_configuration_type_dagme')
export class ConfigurationTypeDagme extends BaseEntity{

  @Column()
  name: string;

  @Column()
  status: boolean;

  @ManyToMany(() => Register, register => register.configurationTypeDagmes)
  registers: Register[];

  constructor(data?:Partial<ConfigurationTypeDagme>){
    super();
    if(data) Object.assign(this, data);
  }
  static create(dto: CreateConfigurationTypeDagmeDto, userId: number ):ConfigurationTypeDagme{
    const entities = new ConfigurationTypeDagme();
    entities.name = dto.name.toUpperCase();
    entities.status = true;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateConfigurationTypeDagmeDto, userId){
    if(dto.name !== null && dto.name !== undefined ){
      this.name = dto.name.toUpperCase();
    }
    this.status = true;
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
      status: this.status,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
  }
}
