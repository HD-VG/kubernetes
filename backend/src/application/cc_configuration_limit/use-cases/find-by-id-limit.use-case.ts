/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ILimitRepositoryToken } from 'src/application/cc_configuration_limit/tokens/limit-repository.tokens';
import { FindById } from 'src/common/dto/findById.dto';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';

@Injectable()
export class FindByIdLimitUseCase {
  constructor(
    @Inject(ILimitRepositoryToken)
    private readonly limitRepository: ILimitRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.limitRepository.findById(dto);
  }
}
