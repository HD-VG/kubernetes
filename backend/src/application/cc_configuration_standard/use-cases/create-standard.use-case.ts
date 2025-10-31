/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateStandardDto } from 'src/presentation/dtos/cc_configuration_standard/create-standard.dto';
import { IStandardRepositoryToken } from '../tokens/standard-repository.tokens';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';

@Injectable()
export class CreateStandardUseCase {
  constructor(
    @Inject(IStandardRepositoryToken)
    private readonly standardRepository: IStandardRepository,
  ) {}

  async execute(dto: CreateStandardDto, userId: number) {
    return this.standardRepository.create(dto, userId);
  }
}
