/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ILimitRepositoryToken } from '../tokens/limit-repository.tokens';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { CreateLimitDto } from 'src/presentation/dtos/cc_configuration_limit/create-limit.dto';

@Injectable()
export class CreateLimitUseCase {
  constructor(
    @Inject(ILimitRepositoryToken)
    private readonly limitRepository: ILimitRepository,
  ) {}

  async execute(dto: CreateLimitDto, userId: number) {
    return this.limitRepository.create(dto, userId);
  }
}
