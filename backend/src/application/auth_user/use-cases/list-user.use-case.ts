/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';

@Injectable()
export class ListUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute() {
    return await this.userRepository.listUsers();
  }
}
