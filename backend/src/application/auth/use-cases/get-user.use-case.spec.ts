/* eslint-disable prettier/prettier */
import { GetUserUseCase } from './get-user.use-case'; 
import { IAuthRepository } from 'src/domain/auth/interface/auth.interface';
import { Request } from '@nestjs/common'; 
import { AnswerQuery } from 'src/common/dto/answer.dto';

type MockRequest = Omit<Partial<Request>, 'headers'> & { headers: Record<string, string> };

describe('GetUserUseCase', () => {
    let useCase: GetUserUseCase;
    let authRepository: IAuthRepository;

    beforeEach(() => {
        authRepository = {
            getIdToken: jest.fn(),
            findUser: jest.fn(),
        } as any;

        useCase = new GetUserUseCase(authRepository);
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

    describe('when token is invalid', () => {
        it('should return error message for invalid token', async () => {
            const mockToken = 'invalid-token';
            const req: MockRequest = {
                headers: {
                    authorization: `Bearer ${mockToken}`,
                },
            };

            (authRepository.getIdToken as jest.Mock).mockResolvedValue(null); 

            const result = await useCase.execute(req as unknown as Request);

            expect(authRepository.getIdToken).toHaveBeenCalledWith(mockToken);
            expect(authRepository.findUser).not.toHaveBeenCalled();
            expect(result).toEqual({ status: false, message: 'Invalid token' });
        });
    });

    describe('when user is not found', () => {
        it('should return error message for user not found', async () => {
            const mockToken = 'valid-token';
            const mockIdToken = 123;
            const req: MockRequest = {
                headers: {
                    authorization: `Bearer ${mockToken}`,
                },
            };

            (authRepository.getIdToken as jest.Mock).mockResolvedValue(mockIdToken);
            (authRepository.findUser as jest.Mock).mockResolvedValue(null); 

            const result = await useCase.execute(req as unknown as Request);

            expect(authRepository.getIdToken).toHaveBeenCalledWith(mockToken);
            expect(authRepository.findUser).toHaveBeenCalledWith({ id: mockIdToken });
            expect(result).toEqual({ status: false, message: 'User not found' });
        });
    });

    describe('when token and user are valid', () => {
        it('should return user data successfully', async () => {
            const mockToken = 'valid-jwt-token';
            const mockIdToken = 123;
            const mockUser = {
                id: 123,
                name: 'Test User',
            };
            const expectedResult: AnswerQuery = {
                status: true,
                message: mockUser.name,
                all: mockUser,
            };

            const req: MockRequest = {
                headers: {
                    authorization: `Bearer ${mockToken}`,
                },
            };

            (authRepository.getIdToken as jest.Mock).mockResolvedValue(mockIdToken);
            (authRepository.findUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await useCase.execute(req as unknown as Request);

            expect(authRepository.getIdToken).toHaveBeenCalledWith(mockToken);
            expect(authRepository.findUser).toHaveBeenCalledWith({ id: mockIdToken });
            expect(result).toEqual(expectedResult);
        });
    });
});