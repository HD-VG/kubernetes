/* eslint-disable prettier/prettier */
import { ConfigurationTypeDagme } from "src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity";
import { ConfigurationTypeMachine } from "src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity";
import { ConfigurationUtil } from "src/domain/ag_configuration_utils/entities/configuration_util.entity";
import { ConfigurationTypeWork } from "src/domain/ag_configuration_type_work/entities/configuration_type_work.entity";
import { Reported } from "src/domain/ag_reported/entities/reported.entity";
import { Reporter } from "src/domain/ag_reporter/entities/reporter.entity";
import {
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  OneToMany
} from "typeorm";
import { ConfigurationTypeMaterial } from "src/domain/ag_configuration_type_material/entities/configuration_type_material.entity";
import { ConfigurationCars } from 'src/domain/ag_configuration_cars/entities/configuration_car.entity'
import { AsignationUserRol } from "src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity";
import { RegisterPicture } from "src/domain/ag_register_picture/entities/register_picture.entity";
import { SnapshotDTO } from "src/presentation/dtos/ag_register/snapshot.dto";
import { CreateRegisterDto } from "src/presentation/dtos/ag_register/create-register.dto";
import { UpdateRegisterDto } from "src/presentation/dtos/ag_register/update-register.dto";
import { formatDate } from "src/common/utils/date.utils";
import { BaseEntity } from "src/common/domain/base-url/entity";

@Entity('ag_register')
export class Register extends BaseEntity{

  @Column()
  reason: string;

  @Column()
  addressDagme: string;

  @Column({ nullable: true })
  dateDagme: Date;

  @Column({ nullable: true })
  timeStart: string;

  @Column({ nullable: true })
  timeWater: string;

  @Column({ nullable: true })
  perforation: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  cite: number;

  @Column()
  timeInit: string;

  @Column()
  timeEnd: string;

  @Column()
  drillHole: number;

  @Column({ default: false, nullable: true })
  state: boolean;

  @Column({ type: 'json', nullable: true })
  snapshot: SnapshotDTO;

  @ManyToOne(() => Reporter, (reporter) => reporter.register)
  @JoinColumn({ name: 'reporter_id' })
  reporter: Reporter;

  @ManyToOne(() => Reported, (reported) => reported.register)
  @JoinColumn({ name: 'reported_id' })
  reported: Reported;

  @OneToMany(() => ConfigurationTypeMaterial, configurationTypeMaterial => configurationTypeMaterial.register)
  configurationTypeMaterials: ConfigurationTypeMaterial[];

  @OneToMany(() => ConfigurationCars, configurationCar => configurationCar.register)
  configurationCar: ConfigurationCars[];

  @ManyToMany(() => ConfigurationUtil)
  @JoinTable({
    name: "ag_register_configuration_util",
    joinColumn: { name: "register_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "configuration_util_id", referencedColumnName: "id" }
  })
  configurationUtil: ConfigurationUtil[];

  @ManyToMany(() => ConfigurationTypeMachine)
  @JoinTable({
    name: "ag_register_configuration_type_machine",
    joinColumn: { name: "register_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "configuration_type_machine_id", referencedColumnName: "id" }
  })
  configurationTypeMachines: ConfigurationTypeMachine[];

  @ManyToMany(() => ConfigurationTypeDagme)
  @JoinTable({
    name: "ag_register_configuration_type_dagme",
    joinColumn: { name: "register_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "configuration_type_dagme_id", referencedColumnName: "id" }
  })
  configurationTypeDagmes: ConfigurationTypeDagme[];

  @ManyToMany(() => ConfigurationTypeWork)
  @JoinTable({
    name: "ag_register_configuration_type_work",
    joinColumn: { name: "register_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "configuration_type_work_id", referencedColumnName: "id" }
  })
  configurationTypeWorks: ConfigurationTypeWork[];

  @ManyToMany(() => AsignationUserRol)
  @JoinTable({
    name: "ag_register_assignment_worker",
    joinColumn: { name: "register_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "asignacion_user_rol_id", referencedColumnName: "id" }
  })
  assignment_user: AsignationUserRol[];

  @OneToMany(() => RegisterPicture, registerPicture => registerPicture.register, { cascade: true })
  registerPictures: RegisterPicture[];


  constructor(data?: Partial<Register>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto: CreateRegisterDto,validations, userId: number): Register {
    const entities = new Register();
    entities.reason = dto.reason;
    entities.addressDagme = dto.addressDagme;
    entities.dateDagme = dto.dateDagme;
    entities.timeStart = dto.timeStart;
    entities.timeWater = dto.timeWater;
    entities.perforation = dto.perforation;
    entities.code = dto.code;
    entities.cite = dto.cite;
    entities.timeInit = dto.timeInit;
    entities.timeEnd = dto.timeEnd;
    entities.drillHole = dto.drillHole;
    entities.configurationTypeMachines =validations.validatedDtoMachine;
    entities.configurationTypeDagmes =validations.validatedDtoDagmes;
    entities.configurationTypeWorks =validations.validatedDtoWorks;
    entities.configurationUtil =validations.validatedDtoUtils;
    entities.state =false;
    entities.reported =validations.reported;
    entities.reporter =validations.reporter;
    entities.assignment_user =validations.validatedDtoWorker;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }

  update(dto: UpdateRegisterDto,validations,userId: number) {
    this.reason = dto.reason;
    this.addressDagme = dto.addressDagme;
    this.dateDagme = dto.dateDagme;
    this.timeStart = dto.timeStart;
    this.timeWater = dto.timeWater;
    this.perforation = dto.perforation;
    this.code = dto.code;
    this.cite = dto.cite;
    this.timeInit = dto.timeInit;
    this.timeEnd = dto.timeEnd;
    this.drillHole = dto.drillHole;
    this.configurationTypeMachines = validations.validatedDtoMachine;
    this.configurationTypeDagmes = validations.validatedDtoDagmes;
    this.configurationTypeWorks = validations.validatedDtoWorks;
    this.configurationUtil = validations.validatedDtoUtils;
    this.state = false;
    this.reported = validations.reported;
    this.reporter = validations.reporter;
    this.assignment_user = validations.validatedDtoWorker;
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  delete(user: number) {
    this.deleteUserId = user;
    this.deleteAt = new Date();
    return this;
  }

  getResponse() {
    return {
      id: this.id,
      uuid: this.uuid,
      reason: this.reason,
      addressDagme: this.addressDagme,
      timeStart: this.timeStart,
      timeWater: this.timeWater,
      perforation: this.perforation,
      code: this.code,
      cite: this.cite,
      timeInit: this.timeInit,
      timeEnd: this.timeEnd,
      drillHole: this.drillHole,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
  }

}
