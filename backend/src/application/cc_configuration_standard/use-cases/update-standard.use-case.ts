/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { IStandardRepositoryToken } from '../tokens/standard-repository.tokens';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import { UpdateStandardDto } from 'src/presentation/dtos/cc_configuration_standard/update-standard.dto';

@Injectable()
export class UpdateStandardUseCase {
  constructor(
    @Inject(IStandardRepositoryToken)
    private readonly standardRepository: IStandardRepository,
  ) {}

  async execute(id: number, dto: UpdateStandardDto, userId: number) {
    return await this.standardRepository.update(id, dto, userId);
  }
}
