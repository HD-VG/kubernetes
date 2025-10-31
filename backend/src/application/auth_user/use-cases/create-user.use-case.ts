/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { CreateUserDto } from 'src/presentation/dtos/auth_user/create-user.dto';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken) 
    private readonly userRepository: IUserRepository
  ) {}

  async execute(dto: CreateUserDto, userId: number) {
    return await this.userRepository.create(dto, userId);
  }
}