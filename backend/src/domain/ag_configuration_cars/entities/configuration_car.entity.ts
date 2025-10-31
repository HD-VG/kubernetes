/* eslint-disable prettier/prettier */
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { CreateConfigurationCarDto,UpdateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('ag_configuration_cars')
export class ConfigurationCars extends BaseEntity{

  @Column({ nullable: true })
  idVehiculo: string;

  @Column({ nullable: true })
  licensePlate: string;

  @Column({ nullable: true })
  make: string;

  @Column({ nullable: true })
  model: string;

  @Column({ type: 'decimal', precision: 12, scale: 8 })
  basicCoste: number;

  @Column({ nullable: true })
  estado: number;

  @Column({ nullable: true })
  time: string;

  @ManyToOne(() => Register, register => register.configurationCar)
  @JoinColumn({ name: 'register_id' })
  register: Register;

  constructor(data?: Partial<ConfigurationCars>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto,createConfigurationCarDto:CreateConfigurationCarDto,register, userId: number): ConfigurationCars {
    const entities = new ConfigurationCars();
    entities.idVehiculo = dto.idVehiculo;
    entities.licensePlate = dto.placa.toUpperCase();
    entities.make = dto.marca.toUpperCase();
    entities.model = dto.modelo.toUpperCase();
    entities.basicCoste = dto.costo_base;
    entities.estado = dto.estado;
    entities.time = createConfigurationCarDto.time;
    entities.register = register;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateConfigurationCarDto,getCarsByIdApi,register,userId : number) {

    this.idVehiculo = getCarsByIdApi.idVehiculo ?? this.idVehiculo;
    this.licensePlate = getCarsByIdApi.placa?.toUpperCase() ?? this.licensePlate;
    this.make = getCarsByIdApi.marca?.toUpperCase() ?? this.make;
    this.model = getCarsByIdApi.modelo?.toUpperCase() ?? this.model;
    this.basicCoste = getCarsByIdApi.costo_base ?? this.basicCoste;
    this.estado = getCarsByIdApi.estado ?? this.estado;
    this.time = dto.time ?? this.time;
    this.register = register ?? this.register;
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this;
  }
  delete(userId : number){
    this.deleteUserId= userId;
    this.deleteAt = new Date();
    return this;
  }
  getResponse() {
    return {
      id: this.id,
      uuid: this.uuid,
      idVehiculo: this.idVehiculo,
      licensePlate: this.licensePlate,
      make: this.make,
      model: this.model,
      basicCoste: this.basicCoste,
      estado: this.estado,
      time: this.time,
      register: this.register ? {
        reason: this.register.reason,
        addressDagme: this.register.addressDagme,
        timeStart: this.register.timeStart,
        timeWater: this.register.timeWater,
        perforation: this.register.perforation,
        code: this.register.code,
        cite: this.register.cite,
        timeInit: this.register.timeInit,
        timeEnd: this.register.timeEnd,
        drillHole: this.register.drillHole,
      } : null, 
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
  }
}