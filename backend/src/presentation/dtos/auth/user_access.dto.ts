/* eslint-disable prettier/prettier */
import { User } from 'src/domain/auth_user/entities/user.entity'
export class UserAccess {
  username: string;
  rol: string;
  permissions: string[];
}

export class UserAccessResponse {
  userAccessList: UserAccess[];
}

export class AuthResponseDto {
  id: number;
  token: string;
  user: string;
  access: UserAccess[];
}

export class ChecValueskDto {
  id: number;
  username: string;
  email: string;
  password?: string;
  user?: User
}
