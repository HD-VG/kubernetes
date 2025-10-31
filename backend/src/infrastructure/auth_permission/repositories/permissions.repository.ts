/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Permission } from '../../../domain/auth_permission/entities/permission.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/presentation/dtos/auth_permission/index.dto';
import { AnswerQuery, FindById, PaginationDto } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';

@Injectable()
export class PermissionRepository implements IPermissionRepository{
    constructor(
        @InjectRepository(Permission)
        private readonly permissionRepository: Repository<Permission>,
    ) { }

    async create(createPermissionDto: CreatePermissionDto, id: number): Promise<AnswerQuery> {
        try {
            const name = await this.findByName(createPermissionDto.name)
            if(name.data === createPermissionDto.name) {
                return { message: ResponseMessages.BAD_PARAM, status: false }
            }
            const newData = Permission.create(createPermissionDto, id);
            const data = await this.permissionRepository.save(newData)
            if(data){
                return { message: ResponseMessages.RECORD_CREATED, status: true, data }
            } else {
                return { message: ResponseMessages.SERVER_ERROR, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async update(id: number, updatePermissionDto: UpdatePermissionDto, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.permissionRepository.findOne({ where: {id} });
            if(!data){
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            }
            if(updatePermissionDto.name) {
                data.name = updatePermissionDto.name;
            }
            data.updateUserId = userId;
            data.updateAt = new Date();
            const data1 = await this.permissionRepository.save(data);
            if(data1) {
                return { message: ResponseMessages.RECORD_MODIFIED, status: true, data: data1 }
            } else {
                return { message: ResponseMessages.SERVER_ERROR, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async findByName(name: string): Promise<AnswerQuery> {
        try {
            const data = await this.permissionRepository.findOneBy({ name });
            if(data){
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async findById(FindById: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.permissionRepository.findOneBy({id: FindById.id})
            if(data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND, status: true, data
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const data = await this.permissionRepository.find({
                where: {
                    deleteAt: IsNull(),
                    name: Like(`%${parameter}%`)
                },
                take: limit,
                skip: offset,
                order: { createAt: 'DESC' },
            })
            const data1 = await this.permissionRepository.find({ where: {deleteAt: IsNull()} });
            if(data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data,
                    all: data1
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async listPermission(): Promise<AnswerQuery>{
        try {
            const data = await this.permissionRepository.find({
                where: { deleteAt: IsNull() }
            })
            if(data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data,
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
    async delete(FindById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.permissionRepository.findOneBy({id: FindById.id})
            if(!data) {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
            data.deleteAt = new Date()
            data.deleteUserId = userId
            const data1 = await this.permissionRepository.save(data);
            if(data1){
                return {
                    message: ResponseMessages.RECORD_DELETED,
                    status: true
                }
            } else {
                return { message: ResponseMessages.SERVER_ERROR, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message}
        }
    }
}