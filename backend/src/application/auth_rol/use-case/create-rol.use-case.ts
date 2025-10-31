/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IRolRepository } from 'src/domain/auth_rol/interface/rol.interfac';
import { CreateRolDto } from 'src/presentation/dtos/auth_rol/create-rol.dto';
import { IRolRepositoryToken } from '../tokens/rol-repository.tokens';

@Injectable()
export class CreateRolUseCase {
  constructor(
    @Inject(IRolRepositoryToken) 
    private readonly rolRepository: IRolRepository
  ) {}

  async execute(dto: CreateRolDto, userId: number) {
    return await this.rolRepository.create(dto, userId);
  }
}