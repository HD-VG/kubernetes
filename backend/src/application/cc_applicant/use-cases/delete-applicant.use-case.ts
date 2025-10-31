/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { IApplicantRepositoryToken } from '../tokens/applicant.tokens';

@Injectable()
export class DeleteApplicantUseCase {
  constructor(
    @Inject(IApplicantRepositoryToken)
    private readonly configurationVersionRepository: IApplicantRepository,
  ) {}

  async execute(dto: FindById, userId: number) {
    return await this.configurationVersionRepository.delete(dto,userId);
  }
}
