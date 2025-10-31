/* eslint-disable prettier/prettier */
import { Rol } from 'src/domain/auth_rol/entities/rol.entity';
import { User } from 'src/domain/auth_user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { CreateUserRolInterface } from 'src/application/auth_user/interface/asignatio-user-rol.interface'
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('auth_asignation_user_rol')
export class AsignationUserRol extends BaseEntity {

  @ManyToOne(() => User, (user) => user.asignationUserRol)
  @JoinColumn({ name: 'usuario_id' })
  user: User;

  @ManyToOne(() => Rol, (rol) => rol.asignationUserRol)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToMany(() => Register, (register) => register.assignment_user)
  assignment_user: Register[];

  constructor(data?: Partial<AsignationUserRol>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: CreateUserRolInterface,
    userId: number
  ): AsignationUserRol {
    const asignationUserRol = new AsignationUserRol();
    asignationUserRol.user = dto.user;
    asignationUserRol.rol = dto.rol;
    asignationUserRol.createUserId = userId;
    asignationUserRol.createAt = new Date();
    return asignationUserRol;
  }

  update(
    dto: Partial<CreateUserRolInterface>,
    userId: number
  ): AsignationUserRol {
    if (dto.user) this.user = dto.user;
    if (dto.rol) this.rol = dto.rol;
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this;
  }
}
