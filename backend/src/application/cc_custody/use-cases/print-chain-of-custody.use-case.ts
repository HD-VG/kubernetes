/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { FindById } from 'src/common/dto/index.dto';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';

@Injectable()
export class PrintCustodyUseCase {
  constructor(
    @Inject(ICustodyRepositoryToken)
    private readonly transportRepository: ICustodyRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.transportRepository.printChainOfCustody(dto);
  }
}
