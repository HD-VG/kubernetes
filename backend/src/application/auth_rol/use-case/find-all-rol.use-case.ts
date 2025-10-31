/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class FindAllRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute(dto: PaginationDto) {
    return await this.rolRepository.list(dto);
  }
}