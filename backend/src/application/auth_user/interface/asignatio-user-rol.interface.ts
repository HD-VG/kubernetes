/* eslint-disable prettier/prettier */
import { Rol, User } from 'src/domain/shared/index.entity';

export class CreateUserRolInterface {
  user: User;
  rol: Rol;
}
