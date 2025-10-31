/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { ITransportRepositoryToken } from '../tokens/transport-repository.tokens';

@Injectable()
export class FindTransportUseCase {
  constructor(
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository,
  ) {}

  async execute(dto: number) {
    return await this.transportRepository.findByCustodyId(dto);
  }
}
