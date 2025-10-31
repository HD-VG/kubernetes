/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { IPermissionRepositoryToken } from '../tokens/permission-repository.tokens';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class FindOnePermissionUseCase {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly configurationVersionRepository: IPermissionRepository,
  ) {}

  async execute(id: FindById) {
    return await this.configurationVersionRepository.findById(id);
  }
}
