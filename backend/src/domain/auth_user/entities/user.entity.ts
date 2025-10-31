/* eslint-disable prettier/prettier */
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { CreateUserInterface, UpdateUserInterface } from 'src/application/auth_user/interface/index.interface';
import {
  Column,
  Entity,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('auth_user')
export class User extends BaseEntity{

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => AsignationUserRol, (asignationUserRol) => asignationUserRol.user, {
    eager: false,
  })
  asignationUserRol: AsignationUserRol[];


  constructor(data?: Partial<User>) {
    super();
    if (data) Object.assign(this, data);
  }

  static create(
    createUser: CreateUserInterface,
    userId: number
  ): User {
    const user = new User();
    user.name = createUser.name.toString();
    user.username = createUser.username;
    user.email = createUser.email;
    user.password = createUser.password;
    user.createUserId = userId;
    user.createAt = new Date();
    return user;
  }

  update(
    updateDto: Partial<UpdateUserInterface>,
    userId: number
  ) {
    if (updateDto.name) {
      this.name = updateDto.name.toString();
    }
    if (updateDto.username) {
      this.username = updateDto.username;
    }
    if (updateDto.email) {
      this.email = updateDto.email;
    }
    if (updateDto.password) {
      this.password = updateDto.password;
    }
    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  softDelete(userId: number) {
    if (this.deleteAt) {
      throw new Error('Este registro ya fue eliminado');
    }

    this.deleteAt = new Date();
    this.deleteUserId = userId;
  }
}
