/* eslint-disable prettier/prettier */
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { AsignationRolPermission } from 'src/domain/auth_asignation_rol_permision/entities/asignation_rol_permission.entity';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('auth_rol')
export class Rol extends BaseEntity{

  @Column()
  name: string;
  
  @Column({ type: 'decimal', precision: 16, scale: 8 , nullable: true })
  monthlyBasic: number;

  @OneToMany(() => AsignationUserRol, (asignationUserRol) => asignationUserRol.rol, {
    eager: false,
  })
  asignationUserRol: AsignationUserRol[];

  @OneToMany(() => AsignationRolPermission, (asignationRolPermission) => asignationRolPermission.rol, {
    eager: false,
  })
  asignationRolPermission: AsignationRolPermission[];

  constructor(data?: Partial<Rol>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    name: string,
    userId: number
  ): Rol {
    const entity = new Rol();
    entity.name = name;
    entity.createUserId = userId;
    entity.createAt = new Date();
    entity.updateAt = new Date();
    return entity;
  }

  update(
    name: string,
    userId: number
  ) {
    this.name = name;
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  solfDelete(
    userId: number
  ) {
    if (this.deleteAt) {
      throw new Error('Este registro ya fue eliminado');
    }
    this.deleteUserId = userId;
    this.deleteAt = new Date();
  }
}
