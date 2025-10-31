/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { CreateReportedDto } from 'src/presentation/dtos/ag_reported/create-reported.dto';
import { UpdateReportedDto } from 'src/presentation/dtos/ag_reported/update-reported.dto';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';

@Entity('ag_reported')
export class Reported extends BaseEntity{

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

  @OneToMany(()=>Register, (register) => register.reported)
  register: Register[];

  constructor(data?: Partial<Reported>) {
    super();
    if (data) Object.assign(this, data);
  }
  static create(dto: CreateReportedDto, userId: number): Reported {
    const entities = new Reported();
    entities.name = dto.name.toUpperCase();
    entities.lastname = dto.lastname.toUpperCase();
    entities.ci = dto.ci
    entities.phone = dto.phone
    entities.email = dto.email
    entities.address = dto.address.toUpperCase();
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
  }
  update(dto: UpdateReportedDto, userId: number) {
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
      ci:this.ci,
      phone:this.phone,
      email:this.email,
      address:this.address,
      createUserId: this.createUserId,
      createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
      updateUserId: this.updateUserId,
      updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
      deleteUserId: this.deleteUserId,
      deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    };
  }
}
