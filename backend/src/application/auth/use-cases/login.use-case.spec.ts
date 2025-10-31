/* eslint-disable prettier/prettier */
import { LoginUseCase } from './login.use-case'; 
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { CheckDto } from 'src/presentation/dtos/auth/check.dto';
import { UserAccessResponse } from 'src/presentation/dtos/auth/user_access.dto';
import { BadRequestException } from '@nestjs/common';

describe('LoginUseCase', () => {
    let useCase: LoginUseCase;
    let authRepository: IAuthRepository;

    beforeEach(() => {
        authRepository = {
            validateUserCredentials: jest.fn(),
            findUserRoles: jest.fn(),
            singPayload: jest.fn(), 
        } as any;

        useCase = new LoginUseCase(authRepository);
    });

    describe('when user credentials are valid', () => {
        it('should successfully sign payload with user and roles', async () => {
            const mockDto: CheckDto = {
                username: 'testuser',
                password: 'hashedpassword',
            };
            const mockUser = {
                id: 123,
                username: 'testuser',
            };
            const mockRoles: UserAccessResponse = {
                userAccessList: [],
            };
            const mockSignedPayload = {
                status: true,
                message: 'Login exitoso',
                token: 'jwt-token-here',
                user: mockUser,
                roles: mockRoles,
            };

            (authRepository.validateUserCredentials as jest.Mock).mockResolvedValue(mockUser);
            (authRepository.findUserRoles as jest.Mock).mockResolvedValue(mockRoles);
            (authRepository.singPayload as jest.Mock).mockResolvedValue(mockSignedPayload);

            const result = await useCase.execute(mockDto);

            expect(authRepository.validateUserCredentials).toHaveBeenCalledWith(mockDto);
            expect(authRepository.findUserRoles).toHaveBeenCalledWith(mockDto);
            expect(authRepository.singPayload).toHaveBeenCalledWith(mockUser, mockRoles);
            expect(result).toEqual(mockSignedPayload);
        });
    });

    describe('when user credentials are invalid', () => {
        it('should throw BadRequestException', async () => {
            const mockDto: CheckDto = {
                username: 'invaliduser',
                password: 'wrongpassword',
            };

            (authRepository.validateUserCredentials as jest.Mock).mockResolvedValue(null);
            await expect(useCase.execute(mockDto)).rejects.toThrow(BadRequestException);
            await expect(useCase.execute(mockDto)).rejects.toThrow('Error al acceder');

            expect(authRepository.validateUserCredentials).toHaveBeenCalledWith(mockDto);
            expect(authRepository.findUserRoles).not.toHaveBeenCalled();
            expect(authRepository.singPayload).not.toHaveBeenCalled();
        });
    });
});