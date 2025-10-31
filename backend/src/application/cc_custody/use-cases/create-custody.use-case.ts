/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { CreateChainOfCustodyDto } from '../../../presentation/dtos/cc_custody/create-chain_of_custody.dto';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';

@Injectable()
export class CreateCustodyUseCase {
  constructor(
    @Inject(ICustodyRepositoryToken)
    private readonly transportRepository: ICustodyRepository,
  ) {}

  async execute(dto: CreateChainOfCustodyDto, userId: number) {
    return await this.transportRepository.create(dto, userId);
  }
}
