/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/presentation/dtos/auth_permission/index.dto';
import { FindById, PaginationDto } from 'src/common/dto/index.dto';
import { IPermissionRepository } from 'src/domain/auth_permission/interface/permission.interface';
import { IPermissionRepositoryToken } from 'src/application/auth_permission/tokens/permission-repository.tokens';

@Injectable()
export class PermissionsService {
  constructor(
    @Inject(IPermissionRepositoryToken)
    private readonly permissionRepository: IPermissionRepository
  ) {}

  async create(createPermissionDto: CreatePermissionDto, id: number) {
    return await this.permissionRepository.create(createPermissionDto, id);
  }

  async findAll(paginationDto: PaginationDto) {
    return await this.permissionRepository.list(paginationDto);
  }

  async findOne(findById: FindById) {
    return await this.permissionRepository.findById(findById);
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
    userId: number,
  ) {
    return await this.permissionRepository.update(
      id,
      updatePermissionDto,
      userId,
    );
  }

  async remove(findById: FindById, userId: number) {
    return await this.permissionRepository.delete(findById, userId);
  }
}
