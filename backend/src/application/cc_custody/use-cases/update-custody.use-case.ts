/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { UpdateChainOfCustodyDto } from 'src/presentation/dtos/cc_custody/update-chain_of_custody.dto';
import { ICustodyRepositoryToken } from '../tokens/custody-repository.tokens';

@Injectable()
export class UpdateCustodyUseCase {
  constructor(
    @Inject(ICustodyRepositoryToken)
    private readonly custodyRepository: ICustodyRepository,
  ) {}

  async execute(id: number, dto: UpdateChainOfCustodyDto, userId: number) {
    return await this.custodyRepository.update(id, dto, userId);
  }
}
