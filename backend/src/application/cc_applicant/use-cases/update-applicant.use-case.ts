/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { UpdateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';
import { IApplicantRepositoryToken } from '../tokens/applicant.tokens';

@Injectable()
export class UpdateApplicantUseCase {
  constructor(
    @Inject(IApplicantRepositoryToken)
    private readonly configurationVersionRepository: IApplicantRepository,
  ) {}

  async execute(id: number, dto: UpdateApplicantDto, userId: number) {
    return await this.configurationVersionRepository.update(id, dto, userId);
  }
}
