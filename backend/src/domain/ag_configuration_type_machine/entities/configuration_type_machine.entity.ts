/* eslint-disable prettier/prettier */
import {
  Column,
  Entity,
  ManyToMany,
} from 'typeorm';
import { CreateConfigurationTypeMachineDto, UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('ag_configuration_type_machine')
export class ConfigurationTypeMachine extends BaseEntity{

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 16, scale: 8 })
  basicCoste: number;

  @Column({ type: 'decimal', precision: 16, scale: 8 })
  basicCosteHour: number;

  @Column({ type: 'decimal', precision: 16, scale: 8 })
  basicCosteYear: number;

  @ManyToMany(() => Register, register => register.configurationTypeMachines)
  registers: Register[];
  
  constructor (data?: Partial<ConfigurationTypeMachine>){
    super();
    if(data) Object.assign(this, data);
  }
  static create(dto:CreateConfigurationTypeMachineDto, userId: number ){
    const entities = new ConfigurationTypeMachine();
    entities.name = dto.name.toUpperCase();
    entities.basicCoste = dto.basicCoste;
    entities.basicCosteHour = Number(((dto.basicCoste / 365) / 24).toFixed(8))
    entities.basicCosteYear = Number((dto.basicCoste / 365).toFixed(8));
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateConfigurationTypeMachineDto,userId: number){
    if(dto.name !== null && dto.name !== undefined ){
      this.name = dto.name.toUpperCase();
    }
    if(dto.basicCoste == null || dto.basicCoste == undefined ){
      dto.basicCoste = this.basicCoste;
    }else{
      this.basicCoste = dto.basicCoste
    }
    this.basicCosteHour = Number(((dto.basicCoste / 365) / 24).toFixed(8));
    this.basicCosteYear = Number((dto.basicCoste / 365).toFixed(8));
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
      basicCoste: this.basicCoste,
      basicCosteHour: this.basicCosteHour,
      basicCosteYear: this.basicCosteYear,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
  }
}
