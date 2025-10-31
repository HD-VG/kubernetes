/* eslint-disable prettier/prettier */
import { Rol } from 'src/domain/auth_rol/entities/rol.entity';
import { Permission } from 'src/domain/auth_permission/entities/permission.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { CreateRolPermissionInterface } from 'src/application/auth_rol/interface/create-rol-permission.interface';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('auth_asignation_rol_permission')
export class AsignationRolPermission extends BaseEntity{

  @ManyToOne(() => Rol, (rol) => rol.asignationRolPermission)
  @JoinColumn({ name: 'rol_id' })
  rol: Rol;

  @ManyToOne(() => Permission,(permission) => permission.asignationRolPermission)
  @JoinColumn({ name: 'permission_id' })
  permission: Permission;

  constructor(data?: Partial<AsignationRolPermission>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    dto: CreateRolPermissionInterface,
    userId: number
  ): AsignationRolPermission {
    const asignationRolPermission = new AsignationRolPermission();
    asignationRolPermission.rol = dto.rol;
    asignationRolPermission.permission = dto.permission;
    asignationRolPermission.createUserId = userId;
    asignationRolPermission.createAt = new Date();
    return asignationRolPermission;
  }

  update(
    dto: Partial<CreateRolPermissionInterface>,
    userId: number
  ) {
    this.rol = dto.rol || this.rol;
    this.permission = dto.permission || this.permission;
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this
  }
  delete(user : number){
        this.deleteUserId= user;
        this.deleteAt = new Date();
    return this;
  }
  getResponse(){
    return {
      id: this.id,
      rol: this.rol,
      permission: this.permission,
      createUserId: this.createUserId,
      createAt: this.createAt
    }
  }
}
