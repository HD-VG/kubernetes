/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException
} from '@nestjs/common';
import { User } from 'src/domain/auth_user/entities/user.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CheckDto, CreateUserDto, UpdateUserDto } from 'src/presentation/dtos/auth/index.dto';
import { FindById, PaginationDto, AnswerQuery, DeleteManyDto } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { Rol } from 'src/domain/auth_rol/entities/rol.entity';
import { formatDate } from 'src/common/utils/index.utils';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { UserService } from '../services/user.service';
import { CreateUserInterface, CreateUserRolInterface, UpdateUserInterface } from 'src/application/auth_user/interface/index.interface';
@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(AsignationUserRol)
        private readonly asignationUserRolRepository: Repository<AsignationUserRol>,
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,

        private readonly userService: UserService
    ) { }
    async deleteMassive(data: DeleteManyDto, userId: number): Promise<AnswerQuery> {
        try {
            if (!data) { return { message: ResponseMessages.BAD_PARAM, status: false } }
            for (const userUuid of data.uuid) {
                const user = await this.userRepository.findOneBy({ uuid: userUuid });
                user.softDelete(userId);
                await this.userRepository.save(user);
            }
            return { status: true, message: ResponseMessages.RECORD_DELETED }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async create(createUserDto: CreateUserDto, id: number): Promise<AnswerQuery> {
        try {
            const password = await this.userService.encriptPassword(createUserDto.password);
            const dto: CreateUserInterface = {
                email: createUserDto.email,
                password,
                name: createUserDto.name,
                username: createUserDto.username,
            }
            const user = User.create(dto, id);
            const data = await this.userRepository.save(user);
            if (createUserDto.roles && createUserDto.roles.length > 0) {
                for (const rol of createUserDto.roles) {
                    const findRol = await this.rolRepository.findOneBy({ uuid: rol.id_rol })
                    if (findRol) {
                        const dto: CreateUserRolInterface = {
                            user: data,
                            rol: findRol
                        }
                        const union = AsignationUserRol.create(dto, id);
                        await this.asignationUserRolRepository.save(union)
                    }
                }
            }
            if (!data) { return { message: ResponseMessages.BAD_REQUEST, status: false } }
            delete data.password;
            delete data.deleteAt;
            return {
                message: ResponseMessages.RECORD_CREATED,
                status: true,
                data
            };
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
    async findOneById(findById: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.userRepository.findOneBy({ id: findById.id });
            if (data) {
                return {
                    message: ResponseMessages.RECORD_CREATED,
                    status: true,
                    data
                };
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async findUser(findById: FindById) {
        try {
            const data = await this.userRepository.findOneBy({ id: findById.id });
            if (!data) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND } }
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.userRepository.findOneBy({ id: findById.id });
            delete data.password
            delete data.createUserId
            delete data.updateUserId
            delete data.deleteUserId
            delete data.createAt
            delete data.updateAt
            delete data.deleteAt
            delete data.asignationUserRol
            if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data };
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async findUserInformation(id: number): Promise<AnswerQuery> {
        try {
            const data = await this.userRepository.findOneBy({ id: id });
            delete data.password
            delete data.createUserId
            delete data.updateUserId
            delete data.deleteUserId
            delete data.createAt
            delete data.updateAt
            delete data.deleteAt
            delete data.asignationUserRol
            if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data };
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async update(uuid: string, updateUserDto: UpdateUserDto, userId: number): Promise<AnswerQuery> {
        console.log(updateUserDto);
        try {
            const findUser = await this.userRepository.findOneBy({ uuid });
            const dto: UpdateUserInterface = {
                name: updateUserDto.name,
                username: updateUserDto.username,
                email: updateUserDto.email,
            };
            if(updateUserDto.password != null){
                const passwordTOUpdate = await this.userService.encriptPassword(updateUserDto.password);
                dto.password = passwordTOUpdate;
            }

            findUser.update(dto, userId)
            const data = await this.userRepository.save(findUser);
            if (updateUserDto.rolesToRemove && updateUserDto.rolesToRemove.length > 0) {
                for (const roleToRemove of updateUserDto.rolesToRemove) {
                    const userRole = await this.asignationUserRolRepository.findOneBy({
                        uuid: roleToRemove.id_user_rol,
                    });

                    if (userRole) { await this.asignationUserRolRepository.remove(userRole); }
                }
            }
            if (updateUserDto.rolesToAdd && updateUserDto.rolesToAdd.length > 0) {
                for (const roleToAdd of updateUserDto.rolesToAdd) {
                    const findRol = await this.rolRepository.findOneBy({ uuid: roleToAdd.id_rol });
                    if (findRol) {
                        const dto: CreateUserRolInterface = {
                            user: data,
                            rol: findRol
                        }
                        const newAssignment = AsignationUserRol.create(dto, userId);
                        await this.asignationUserRolRepository.save(newAssignment);
                    }
                }
            }
            if (data) {
                return { message: ResponseMessages.RECORD_MODIFIED, status: true };
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, };
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST };
        }
    }
    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data, count] = await this.userRepository.findAndCount({
                relations: [
                    'asignationUserRol',
                    'asignationUserRol.rol'
                ],
                where: [
                    { name: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { username: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { email: Like(`%${parameter}%`), deleteAt: IsNull() }
                ],
                take: limit,
                skip: offset,
                order: { createAt: 'DESC' },
            });
            const trasnform = data.map((user) => {
                const union = user.asignationUserRol;
                const transform = union.map((userRol) => {
                    return { id_user_rol: userRol.uuid, id_rol: userRol.rol.uuid, name: userRol.rol ? userRol.rol.name : '' }
                })
                return {
                    uuid: user.uuid,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    createAt: formatDate(user.createAt.toString()),
                    rol: transform
                };
            });
            if (!data) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
            const totalPages = Math.ceil(count / limit);
            return {
                message: "Registros encontrados",
                status: true,
                data: trasnform,
                all: count,
                total: totalPages,
                currentPage: Math.floor(offset / limit) + 1,
                limit,
            };
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
    async listUsers(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.userRepository.findAndCount({
                relations: [
                    'asignationUserRol',
                    'asignationUserRol.rol'
                ],
                where: {
                    deleteAt: IsNull()
                },
                order: { createAt: 'DESC' },
            });
            const trasnform = data.map((user) => {
                const union = user.asignationUserRol;
                const transform = union.map((userRol) => {
                    return { id_user_rol: userRol.uuid, id_rol: userRol.rol.uuid, name: userRol.rol ? userRol.rol.name : '' }
                })
                return {
                    uuid: user.uuid,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    createAt: formatDate(user.createAt.toString()),
                    rol: transform
                };
            });
            if (!data) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
            return {
                message: "Registros encontrados",
                status: true,
                data: trasnform,
                all: count,
            };
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
    async delete(uuid: string, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.userRepository.findOneBy({ uuid: uuid })
            if (!data) { return {  message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
            data.softDelete(userId);
            const data1 = await this.userRepository.save(data)
            if (data1) { return { message: ResponseMessages.RECORD_DELETED, status: true, } } 
            else { return { message: ResponseMessages.SERVER_ERROR, status: false } }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
    async findByName(name: string): Promise<User> {
        try {
            const data: User = await this.userRepository.findOneBy({ name })
            return data
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
    async findByEmail(email: string): Promise<User> {
        try {
            const data = await this.userRepository.findOne({ where: { email } })
            return data
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
    async findByUsernameDto(checkDto: CheckDto): Promise<User> {
        try {
            const data = await this.userRepository.findOne({ where: { username: checkDto.username } })
            return data
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
    async findByUserRolId(id: number): Promise<AnswerQuery> {
        try {
            const data = await this.asignationUserRolRepository.createQueryBuilder("asignationUserRol")
                .innerJoinAndSelect("asignationUserRol.user", "user")
                .innerJoinAndSelect("asignationUserRol.rol", "rol")
                .innerJoinAndSelect('rol.asignationRolPermission', 'asignationRolPermission')
                .innerJoinAndSelect('asignationRolPermission.permission', 'permission')
                .where("user.id = :id", { id })
                .andWhere("asignationUserRol.deleteAt IS NULL")
                .getMany();
            if (!data) { throw new BadRequestException("No encontrado") }
            const userRolesWithPermissions = data.map(asignationUserRol => {
                const role = asignationUserRol.rol;
                const user = asignationUserRol.user;
                const permissions = role.asignationRolPermission.map(asignationRolPermission => {
                    return asignationRolPermission.permission.name;
                });
                return {
                    id: user.id,
                    username: user.username,
                    rol: role.name,
                    permissions
                };
            });
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: userRolesWithPermissions };
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
    async findByUserRol(checkDto: CheckDto): Promise<AnswerQuery> {
        try {
            const { username } = checkDto
            const data = await this.asignationUserRolRepository.createQueryBuilder("asignationUserRol")
                .innerJoinAndSelect("asignationUserRol.user", "user")
                .innerJoinAndSelect("asignationUserRol.rol", "rol")
                .innerJoinAndSelect('rol.asignationRolPermission', 'asignationRolPermission')
                .innerJoinAndSelect('asignationRolPermission.permission', 'permission')
                .where("user.username = :username", { username })
                .andWhere("asignationUserRol.deleteAt IS NULL")
                .getMany();
            if (!data) { throw new BadRequestException("No encontrado") }
            const userRolesWithPermissions = data.map(asignationUserRol => {
                const role = asignationUserRol.rol;
                const user = asignationUserRol.user;
                const permissions = role.asignationRolPermission.map(asignationRolPermission => {
                    return asignationRolPermission.permission.name;
                });
                return {
                    username: user.username,
                    rol: role.name,
                    permissions
                };
            });
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: userRolesWithPermissions };
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST};
        }
    }
}
