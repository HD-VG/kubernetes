/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { UpdatePermissionDto } from 'src/presentation/dtos/auth_permission/index.dto';
import { IPermissionRepositoryToken } from '../tokens/permission-repository.tokens';

@Injectable()
export class UpdatePermissionUseCase {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly configurationVersionRepository: IPermissionRepository,
  ) {}

  async execute(id: number, dto: UpdatePermissionDto, userId: number) {
    return await this.configurationVersionRepository.update(id, dto, userId);
  }
}
