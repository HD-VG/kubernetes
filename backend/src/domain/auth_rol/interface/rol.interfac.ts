/* eslint-disable prettier/prettier */
import {
    FindByUuid,
    DeleteManyDto,
    PaginationDto,
    AnswerQuery
} from 'src/common/dto/index.dto';
import {
    CreateRolDto,
    UpdateRolDto
} from 'src/presentation/dtos/auth_rol/index.dto';

export interface IRolRepository {

    deleteMassive(dto: DeleteManyDto, user: number): Promise<AnswerQuery | null>;
    create(dto: CreateRolDto, user: number): Promise<AnswerQuery | null>;
    update(uuid: string, dto: UpdateRolDto, user: number): Promise<AnswerQuery | null>;
    findByName(name: string): Promise<AnswerQuery | null>;
    findById(dto: FindByUuid): Promise<AnswerQuery | null>;
    list(dto: PaginationDto): Promise<AnswerQuery | null>;
    listRol(): Promise<AnswerQuery | null>;
    delete(dto: string, user: number): Promise<AnswerQuery | null>;
}