/* eslint-disable prettier/prettier */
import { AsignationRolPermission } from 'src/domain/auth_asignation_rol_permision/entities/asignation_rol_permission.entity';
import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { CreatePermissionDto } from 'src/presentation/dtos/auth_permission/index.dto'
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('auth_permissions')
export class Permission extends BaseEntity{

    @Column()
    name: string;

    @OneToMany(() => AsignationRolPermission, (asignationRolPermission) => asignationRolPermission.permission, {
        eager: false,
    })
    asignationRolPermission: AsignationRolPermission[];

    constructor(data?: Partial<Permission>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(
        createPermissionDto: CreatePermissionDto, 
        createUserId: number,
    ): Permission {
        const permission = new Permission();
        permission.name = createPermissionDto.name;
        permission.createUserId = createUserId;
        return permission;
    }
    
}
