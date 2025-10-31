/* eslint-disable prettier/prettier */
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { CreateReporterDto } from 'src/presentation/dtos/ag_reporter/create-reporter.dto';
import { UpdateReporterDto } from 'src/presentation/dtos/ag_reporter/update-reporter.dto';
import {
  Column,
  Entity,
  OneToMany
}
  from 'typeorm';
import { BaseEntity } from 'src/common/domain/base-url/entity'; 

@Entity('ag_reporter')
export class Reporter extends BaseEntity {

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  ci: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  codeReporter: string;

  @OneToMany(() => Register, (register) => register.reported)
  register: Register[];

  constructor(data?: Partial<Reporter>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto: CreateReporterDto, userId: number): Reporter {
    const entities = new Reporter();
    entities.name = dto.name.toUpperCase();
    entities.lastname = dto.lastname.toUpperCase();
    entities.ci = dto.ci
    entities.phone = dto.phone
    entities.email = dto.email
    entities.address = dto.address.toUpperCase();
    entities.codeReporter = dto.codeReporter;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }

  update(dto: UpdateReporterDto, userId: number) {
    if(dto.name !== null && dto.name !== undefined ){
        this.name = dto.name.toUpperCase();
    }
    if(dto.lastname !== null && dto.lastname !== undefined ){
        this.lastname = dto.lastname.toUpperCase();
    }
    this.ci = dto.ci ?? this.ci;
    this.phone = dto.phone ?? this.phone;
    this.email = dto.email ?? this.email;
    if(dto.address !== null && dto.address !== undefined ){
        this.address = dto.address.toUpperCase();
    }
    this.codeReporter= dto.codeReporter;
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this
  }

  delete(user: number) {
    this.deleteUserId = user;
    this.deleteAt = new Date();
  }

  getResponse() {
    return {
      id: this.id,
      uuid: this.uuid,
      name: this.name,
      lastname: this.lastname,
      ci: this.ci,
      phone: this.phone,
      email: this.email,
      address: this.address,
      codeReporter: this.codeReporter,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    };
  }
}
