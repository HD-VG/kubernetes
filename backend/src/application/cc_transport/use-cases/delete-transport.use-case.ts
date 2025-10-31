/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { FindById } from 'src/common/dto/index.dto';
import { ITransportRepositoryToken } from '../tokens/transport-repository.tokens';

@Injectable()
export class DeleteTransportUseCase {
  constructor(
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.transportRepository.delete(dto, userId);
  }
}
