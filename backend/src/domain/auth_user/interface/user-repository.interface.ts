/* eslint-disable prettier/prettier */
import {
    FindById,
    DeleteManyDto,
    PaginationDto,
    AnswerQuery 
} from 'src/common/dto/index.dto';
import {
    CreateUserDto,
    UpdateUserDto
} from 'src/presentation/dtos/auth/index.dto';
import { User } from 'src/domain/auth_user/entities/user.entity'
import { CheckDto } from 'src/presentation/dtos/auth/check.dto';

export interface IUserRepository {
    deleteMassive(dto: DeleteManyDto, user: number): Promise<AnswerQuery | null>;
    create(dto: CreateUserDto, user: number): Promise<AnswerQuery | null>;
    findOneById(dto: FindById): Promise<AnswerQuery | null>;
    findUser(dto: FindById): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    update(uuid: string, dto: UpdateUserDto, user: number): Promise<AnswerQuery | null>;
    list(dto: PaginationDto): Promise<AnswerQuery | null>;
    listUsers(): Promise<AnswerQuery | null>;
    delete(uuid: string, user: number): Promise<AnswerQuery | null>
    findByEmail(email: string): Promise<User | null>
    findByName(name: string): Promise<User | null>;
    findUserInformation(id: number): Promise<AnswerQuery | null>
    findByUsernameDto(dto: CheckDto): Promise<User | null>
    findByUserRolId(id: number): Promise<AnswerQuery | null>
    findByUserRol(dto: CheckDto): Promise<AnswerQuery | null>
}
