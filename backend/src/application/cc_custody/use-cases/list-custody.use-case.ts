/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';

@Injectable()
export class ListCustodyUseCase {
  constructor(
    @Inject(ICustodyRepositoryToken)
    private readonly transportRepository: ICustodyRepository,
  ) {}

  async execute() {
    return await this.transportRepository.listCustody();
  }
}
