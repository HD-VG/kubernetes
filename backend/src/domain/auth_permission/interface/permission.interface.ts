/* eslint-disable prettier/prettier */
import { FindById, PaginationDto , AnswerQuery} from 'src/common/dto/index.dto';
import {
    CreatePermissionDto,
    UpdatePermissionDto
} from 'src/presentation/dtos/auth_permission/index.dto';

export interface IPermissionRepository {
    create(dto: CreatePermissionDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdatePermissionDto, user: number): Promise<AnswerQuery | null>;
    findByName(name: string): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    list(dto: PaginationDto): Promise<AnswerQuery | null>;
    listPermission(): Promise<AnswerQuery | null>;
    delete(dto: FindById, userId: number): Promise<AnswerQuery | null>;
}