/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindOneByIdnUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute(dto: FindById) {
    return await this.userRepository.findOneById(dto);
  }
}
