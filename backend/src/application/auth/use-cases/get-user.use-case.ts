/* eslint-disable prettier/prettier */
import { Injectable, Inject, Request } from '@nestjs/common';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { IAuthRepositoryToken } from '../tokens/auth-repository.token';
import { AnswerQuery } from 'src/common/dto/answer.dto';

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject(IAuthRepositoryToken)
        private readonly authRepository: IAuthRepository
    ) { }

    async execute(req: Request): Promise<AnswerQuery>  {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) { return { status: false, message: 'Authorization header is missing', }; }

        const token = authorizationHeader.split(' ')[1];
        if (!token) { return { status: false, message: 'Token is missing', }; }
        const getToken = await this.authRepository.getIdToken(token);

        if (!getToken) { return { status: false, message: 'Invalid token', }; }

        const user = await this.authRepository.findUser({ id: getToken });
        if (!user) { return { status: false, message: 'User not found', }; }

        return { status: true, message: user.name, all: user };
    }
}