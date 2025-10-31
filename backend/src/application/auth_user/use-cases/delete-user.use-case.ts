/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { FindById } from 'src/common/dto/findById.dto';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';

@Injectable()
export class DeleteUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute(dto: string, userId: number) {
    return await this.userRepository.delete(dto, userId);
  }
}
