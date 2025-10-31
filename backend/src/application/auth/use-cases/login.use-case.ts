/* eslint-disable prettier/prettier */
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { IAuthRepositoryToken } from '../tokens/auth-repository.token';
import { CheckDto } from 'src/presentation/dtos/auth/check.dto';
import { UserAccessResponse } from 'src/presentation/dtos/auth/user_access.dto';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject(IAuthRepositoryToken)
        private readonly authRepository: IAuthRepository
    ) { }

    async execute(dto: CheckDto) {
        const user = await this.authRepository.validateUserCredentials(dto);
        if (user) {
            const rol: UserAccessResponse = await this.authRepository.findUserRoles(dto);
            return await this.authRepository.singPayload(user, rol);
        } else {
            throw new BadRequestException("Error al acceder");
        }
    }
}