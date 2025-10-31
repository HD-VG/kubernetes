/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class FindByIdRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute(dto: FindByUuid) {
    return await this.rolRepository.findById(dto);
  }
}