/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { IPermissionRepositoryToken } from '../tokens/permission-repository.tokens';

@Injectable()
export class ListPermissionUseCase {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly configurationVersionRepository: IPermissionRepository,
  ) {}

  async execute() {
    return await this.configurationVersionRepository.listPermission();
  }
}
