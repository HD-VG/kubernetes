/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Rol } from '../../../domain/auth_rol/entities/rol.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolDto, UpdateRolDto } from 'src/presentation/dtos/auth_rol/index.dto';
import { AnswerQuery, FindById, PaginationDto, DeleteManyDto, FindByUuid } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { formatDate } from 'src/common/utils/index.utils'
import { Permission } from 'src/domain/auth_permission/entities/permission.entity';
import { AsignationRolPermission } from 'src/domain/auth_asignation_rol_permision/entities/asignation_rol_permission.entity';
import { CreateRolPermissionInterface } from 'src/application/auth_rol/interface/create-rol-permission.interface';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
@Injectable()
export class RolRepository implements IRolRepository {
    constructor(
        @InjectRepository(Rol)
        private readonly rolRepository: Repository<Rol>,
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
        @InjectRepository(AsignationRolPermission)
        private readonly asignationRolPermissionRepository: Repository<AsignationRolPermission>,
    ) { }

    async deleteMassive(data: DeleteManyDto, userId: number): Promise<AnswerQuery> {
        try {
            if (!data) { return { message: ResponseMessages.BAD_PARAM, status: false } }
            for (const uuid of data.uuid) {
                const rol = await this.rolRepository.findOneByOrFail({ uuid: uuid });
                if (rol) {
                    rol.solfDelete(userId);
                    await this.rolRepository.save(rol);
                }
            }
            return { status: true, message: ResponseMessages.RECORD_DELETED }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.SERVER_ERROR }
        }
    }
    async create(createRolDto: CreateRolDto, id: number) {
        try {
            const find = Rol.create(createRolDto.name, id);
            const savedRol = await this.rolRepository.save(find)
            if (createRolDto.permisos && createRolDto.permisos.length > 0) {
                for (const perm of createRolDto.permisos) {
                    const findPermission = await this.permissionRepository.findOneBy({ id: perm.id_permission });
                    if (findPermission) {
                        const dto: CreateRolPermissionInterface = {
                            rol: savedRol,
                            permission: findPermission
                        }
                        const union = AsignationRolPermission.create(dto, id);
                        await this.asignationRolPermissionRepository.save(union);
                    }
                }
            }
            if (savedRol) { return { message: ResponseMessages.RECORD_CREATED, status: true, data: savedRol } }
            else { return { message: ResponseMessages.SERVER_ERROR, status: false } }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
    async update(uuid: string, updateRolDto: UpdateRolDto, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.rolRepository.findOneByOrFail({ uuid });
            if (!data) {
                return {
                    message: ResponseMessages.NO_RECORDS_FOUND,
                    status: false,
                };
            }
            data.update(updateRolDto.name, userId);
            const updatedRole = await this.rolRepository.save(data);
            if (updateRolDto.permisosToRemove && updateRolDto.permisosToRemove.length > 0) {
                for (const permiso of updateRolDto.permisosToRemove) {
                    try {
                        await this.asignationRolPermissionRepository.delete({ uuid: permiso.id_aisgnacion });
                    } catch (error) {
                        console.warn(`No se pudo eliminar la asignación ${permiso.id_aisgnacion}:`, error.message);
                    }
                }
            }
            if (updateRolDto.permisosToAdd && updateRolDto.permisosToAdd.length > 0) {
                const currentPermissions = await this.asignationRolPermissionRepository.find({
                    where: { rol: { id: data.id } },
                    relations: ['permission'],
                });

                for (const permiso of updateRolDto.permisosToAdd) {
                    const findPermission = await this.permissionRepository.findOneBy({ uuid: permiso.id_permission });

                    if (findPermission) {
                        const exists = currentPermissions.some(p => p.permission.uuid === findPermission.uuid);
                        if (!exists) {
                            const dto: CreateRolPermissionInterface = {
                                rol: data,
                                permission: findPermission,
                            };
                            const union = AsignationRolPermission.create(dto, userId);
                            await this.asignationRolPermissionRepository.save(union);
                        }
                    }
                }
            }

            if (updatedRole) {
                return {
                    message: ResponseMessages.RECORD_MODIFIED,
                    status: true,
                    data: updatedRole,
                };
            } else {
                return {
                    message: ResponseMessages.SERVER_ERROR,
                    status: false,
                };
            }
        } catch (error) {
            return {
                message: error.message || ResponseMessages.SERVER_ERROR,
                status: false,
            };
        }
    }
    async findByName(name: string): Promise<AnswerQuery> {
        try {
            const data = await this.rolRepository.findOneBy({ name });
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data
                }
            } else {
                return {
                    message: ResponseMessages.NO_RECORDS_FOUND,
                    status: false
                }
            }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
    async findById(findByUuid: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.rolRepository.findOneBy({ uuid: findByUuid.uuid })
            delete data.asignationUserRol
            delete data.asignationRolPermission
            delete data.createUserId
            delete data.updateUserId
            delete data.deleteUserId
            delete data.createAt
            delete data.updateAt
            delete data.deleteAt
            if (data) { return { message: ResponseMessages.RECORDS_FOUND, status: true, data } }
            else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data, count] = await this.rolRepository.findAndCount({
                where: {
                    deleteAt: IsNull(),
                    name: Like(`%${parameter}%`)
                },
                relations: ['asignationRolPermission', 'asignationRolPermission.permission'],
                take: limit,
                skip: offset,
                order: { createAt: 'DESC' },
            })
            const transform = data.map((rol) => {
                const permissions = rol.asignationRolPermission;
                const transform = permissions.map((rolPermission) => {
                    return {
                        id_aisgnacion: rolPermission.uuid,
                        id_permission: rolPermission.permission.uuid,
                        permission: (rolPermission.permission) ? rolPermission.permission.name : ''
                    }
                })
                return {
                    uuid: rol.uuid,
                    name: rol.name,
                    createAt: formatDate(rol.createAt.toString()),
                    permisos: transform
                };
            });
            const totalPages = Math.ceil(count / limit);
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                    total: totalPages,
                    currentPage: Math.floor(offset / limit) + 1,
                    limit
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
    async listRol(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.rolRepository.findAndCount({
                where: {
                    deleteAt: IsNull()
                },
                relations: ['asignationRolPermission', 'asignationRolPermission.permission'],
                order: { createAt: 'DESC' },
            })
            const transform = data.map((rol) => {
                const permissions = rol.asignationRolPermission;
                const transform = permissions.map((rolPermission) => {
                    return {
                        id_aisgnacion: rolPermission.uuid,
                        id_permission: rolPermission.permission.uuid,
                        permission: (rolPermission.permission) ? rolPermission.permission.name : ''
                    }
                })
                return {
                    uuid: rol.uuid,
                    name: rol.name,
                    createAt: formatDate(rol.createAt.toString()),
                    permisos: transform
                };
            });
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
    async delete(uuid: string, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.rolRepository.findOneBy({ uuid: uuid })
            if (!data) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND } }
            data.solfDelete(userId);
            const data1 = await this.rolRepository.save(data);
            if (data1) { return { message: ResponseMessages.RECORD_DELETED, status: true } }
            else { return { message: ResponseMessages.SERVER_ERROR, status: false } }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false, };
        }
    }
}