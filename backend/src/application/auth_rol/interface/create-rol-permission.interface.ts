/* eslint-disable prettier/prettier */
import { Permission, Rol } from 'src/domain/shared/index.entity';

export class CreateRolPermissionInterface {
  rol: Rol;
  permission: Permission;
}
