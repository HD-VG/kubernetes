/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';
import { ITransportRepositoryToken } from '../tokens/transport-repository.tokens';

@Injectable()
export class UpdateTransportUseCase {
  constructor(
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository,
  ) {}

  async execute(id: number, dto: UpdateTransportDto, userId: number) {
    return await this.transportRepository.update(id, dto, userId);
  }
}
