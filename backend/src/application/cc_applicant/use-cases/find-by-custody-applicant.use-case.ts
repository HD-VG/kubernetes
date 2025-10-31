/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { IApplicantRepositoryToken } from '../tokens/applicant.tokens';

@Injectable()
export class FindByCustodyApplicantUseCase {
  constructor(
    @Inject(IApplicantRepositoryToken)
    private readonly configurationVersionRepository: IApplicantRepository,
  ) {}

  async execute(dto: number) {
    return await this.configurationVersionRepository.findByCustodyId(dto);
  }
}
