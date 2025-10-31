/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { CreatePermissionDto } from 'src/presentation/dtos/auth_permission/index.dto';
import { IPermissionRepositoryToken } from '../tokens/permission-repository.tokens';

@Injectable()
export class CreatePermissionUseCase {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly configurationVersionRepository: IPermissionRepository,
  ) {}

  async execute(dto: CreatePermissionDto, userId: number) {
    return await this.configurationVersionRepository.create(dto, userId);
  }
}
