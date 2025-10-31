/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ILimitRepositoryToken } from '../tokens/limit-repository.tokens';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

@Injectable()
export class DeleteLimitUseCase {
  constructor(
    @Inject(ILimitRepositoryToken)
    private readonly limitRepository: ILimitRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.limitRepository.delete(dto, userId);
  }
}
