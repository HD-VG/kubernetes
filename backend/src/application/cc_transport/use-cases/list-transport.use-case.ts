/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { FindById } from 'src/common/dto/index.dto';
import { ITransportRepositoryToken } from '../tokens/transport-repository.tokens';

@Injectable()
export class ListTransportUseCase {
  constructor(
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.transportRepository.list(dto);
  }
}
