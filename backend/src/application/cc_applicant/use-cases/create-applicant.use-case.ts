/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { CreateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';
import { IApplicantRepositoryToken } from '../tokens/applicant.tokens';

@Injectable()
export class CreateApplicantUseCase {
  constructor(
    @Inject(IApplicantRepositoryToken)
    private readonly configurationVersionRepository: IApplicantRepository,
  ) {}

  async execute(dto: CreateApplicantDto, userId: number) {
    return await this.configurationVersionRepository.create(dto, userId);
  }
}
