/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';
import { DeleteManyDto } from 'src/common/dto/delete_massive.dto';

@Injectable()
export class DeleteMultiplyRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute(dto: DeleteManyDto, userId: number) {
    return await this.rolRepository.deleteMassive(dto, userId);
  }
}