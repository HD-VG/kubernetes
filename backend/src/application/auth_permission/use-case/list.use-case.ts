/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { IPermissionRepositoryToken } from '../tokens/permission-repository.tokens';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class ListPaginationPermissionUseCase {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly configurationVersionRepository: IPermissionRepository,
  ) {}

  async execute(dto: PaginationDto) {
    return await this.configurationVersionRepository.list(dto);
  }
}
