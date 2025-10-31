/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { UpdateRolDto } from 'src/presentation/dtos/auth_rol/update-rol.dto';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';

@Injectable()
export class UpdateRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute(uuid: string, dto: UpdateRolDto, userId: number) {
    return await this.rolRepository.update(uuid, dto, userId);
  }
}