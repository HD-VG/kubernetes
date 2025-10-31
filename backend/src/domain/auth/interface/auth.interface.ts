/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import { CheckDto } from 'src/presentation/dtos/auth/check.dto';
import { User } from 'src/domain/shared/index.entity';
import { UserAccessResponse } from 'src/presentation/dtos/auth/user_access.dto';

export interface IAuthRepository {

    validateUserCredentials(dto: CheckDto): Promise<User | null>;
    getIdToken(data: any): Promise<number>;
    findUser(dto: FindById): Promise<any | null>;
    findUserById(dto: string): Promise<AnswerQuery | null>;
    findUserRoles(dto: CheckDto): Promise<UserAccessResponse | null>;
    singPayload(user: User, access: UserAccessResponse): Promise<any>;
}

