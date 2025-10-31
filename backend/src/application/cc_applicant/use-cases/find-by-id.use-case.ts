/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { FindById } from 'src/common/dto/findById.dto';
import { IApplicantRepositoryToken } from '../tokens/applicant.tokens';

@Injectable()
export class FindByIdApplicantUseCase {
  constructor(
    @Inject(IApplicantRepositoryToken)
    private readonly configurationVersionRepository: IApplicantRepository,
  ) {}

  async execute(dto: FindById) {
    return await this.configurationVersionRepository.findById(dto);
  }
}
