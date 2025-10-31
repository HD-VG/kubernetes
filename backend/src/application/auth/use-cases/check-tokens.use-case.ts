/* eslint-disable prettier/prettier */
import { Injectable, Inject, Request } from '@nestjs/common';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { IAuthRepositoryToken } from '../tokens/auth-repository.token';

@Injectable()
export class CheckTokensUseCase {
    constructor(
        @Inject(IAuthRepositoryToken)
        private readonly authRepository: IAuthRepository
    ) { }

    async execute(req: Request) {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) { return { status: false, message: 'Authorization header is missing', }; }

        const token = authorizationHeader.split(' ')[1];
        if (!token) { return { status: false, message: 'Token is missing', }; }
        const getToken = await this.authRepository.getIdToken(token);
        const id = +getToken.toString()
        const findById = { id }
        const user = await this.authRepository.findUser(findById);
        const dto = { username: user.username, password: user.password }
        const rol = await this.authRepository.findUserRoles(dto);
        return await this.authRepository.singPayload(user, rol);
    }
}