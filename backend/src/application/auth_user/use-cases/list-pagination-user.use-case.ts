/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/auth_user/interface/user-repository.interface';
import { IUserRepositoryToken } from '../tokens/user-repository.tokens';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListPaginationUserUseCase {
  // constructor(private readonly userRepository: IUserRepository) {}
  constructor(@Inject(IUserRepositoryToken) private readonly userRepository: IUserRepository) {}

  async execute(dto: PaginationDto) {
    return await this.userRepository.list(dto);
  }
}
