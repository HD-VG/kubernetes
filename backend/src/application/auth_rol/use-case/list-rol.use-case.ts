/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';

@Injectable()
export class ListRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute() {
    return await this.rolRepository.listRol();
  }
}