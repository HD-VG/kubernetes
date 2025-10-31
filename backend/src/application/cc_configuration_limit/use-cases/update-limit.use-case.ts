/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ILimitRepositoryToken } from '../tokens/limit-repository.tokens';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { UpdateLimitDto } from 'src/presentation/dtos/cc_configuration_limit/update-limit.dto';

@Injectable()
export class UpdateLimitUseCase {
  constructor(
    @Inject(ILimitRepositoryToken)
    private readonly limitRepository: ILimitRepository,
  ) {}

  async execute(id: number, dto: UpdateLimitDto, userId: number) {
    return await this.limitRepository.update(id, dto, userId);
  }
}
