/* eslint-disable prettier/prettier */
import { CheckTokensUseCase } from './check-tokens.use-case';
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { Request } from '@nestjs/common'; 

type MockRequest = Omit<Partial<Request>, 'headers'> & { headers: Record<string, string> };

describe('CheckTokensUseCase', () => {
    let useCase: CheckTokensUseCase;
    let authRepository: IAuthRepository;

    beforeEach(() => {
        authRepository = {
            getIdToken: jest.fn(),
            findUser: jest.fn(),
            findUserRoles: jest.fn(),
            singPayload: jest.fn(), 
        } as any;

        useCase = new CheckTokensUseCase(authRepository);
    });

    describe('when authorization header is missing', () => {
        it('should return error message for missing authorization header', async () => {
            const req: MockRequest = {
                headers: {},
            };

            const result = await useCase.execute(req as unknown as Request);

            expect(result).toEqual({ status: false, message: 'Authorization header is missing' });
            expect(authRepository.getIdToken).not.toHaveBeenCalled();
        });
    });

    describe('when token is missing in authorization header', () => {
        it('should return error message for missing token', async () => {
            const req: MockRequest = {
                headers: {
                    authorization: 'Bearer ', 
                },
            };

            const result = await useCase.execute(req as unknown as Request);

            expect(result).toEqual({ status: false, message: 'Token is missing' });
            expect(authRepository.getIdToken).not.toHaveBeenCalled();
        });
    });

    describe('when token is valid', () => {
        it('should successfully sign payload with user and roles', async () => {
            const mockToken = 'valid-jwt-token';
            const mockIdToken = '123';
            const mockUser = {
                username: 'testuser',
                password: 'hashedpassword',
            };
            const mockRoles = ['admin', 'user'];
            const mockSignedPayload = {
                status: true,
                message: 'Token validado exitosamente',
                data: { user: mockUser, roles: mockRoles },
            };

            const req: MockRequest = {
                headers: {
                    authorization: `Bearer ${mockToken}`,
                },
            };

            (authRepository.getIdToken as jest.Mock).mockResolvedValue(mockIdToken);
            (authRepository.findUser as jest.Mock).mockResolvedValue(mockUser);
            (authRepository.findUserRoles as jest.Mock).mockResolvedValue(mockRoles);
            (authRepository.singPayload as jest.Mock).mockResolvedValue(mockSignedPayload);

            const result = await useCase.execute(req as unknown as Request);

            expect(authRepository.getIdToken).toHaveBeenCalledWith(mockToken);
            expect(authRepository.findUser).toHaveBeenCalledWith({ id: +mockIdToken });
            expect(authRepository.findUserRoles).toHaveBeenCalledWith({
                username: mockUser.username,
                password: mockUser.password,
            });
            expect(authRepository.singPayload).toHaveBeenCalledWith(mockUser, mockRoles);
            expect(result).toEqual(mockSignedPayload);
        });
    });
});