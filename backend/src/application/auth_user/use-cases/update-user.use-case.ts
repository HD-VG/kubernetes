/* eslint-disable prettier/prettier */
import { UpdateUserDto } from 'src/presentation/dtos/auth_user/update-user.dto';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';

@Injectable()
export class UpdateUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute(id: string, dto: UpdateUserDto, userId: number) {
    return await this.userRepository.update(id, dto, userId);
  }
}
