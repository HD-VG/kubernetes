/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { DeleteManyDto } from 'src/common/dto/delete_massive.dto';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';

@Injectable()
export class DeleteMassiveUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute(dto: DeleteManyDto, userId: number) {
    return await this.userRepository.deleteMassive(dto, userId);
  }
}