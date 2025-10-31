/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateApplicantDto, UpdateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';
import { IApplicantRepositoryToken } from 'src/application/cc_applicant/tokens/applicant.tokens';

@Injectable()
export class ApplicantService {
  constructor(
    // @Inject('IApplicantRepository')
    @Inject(IApplicantRepositoryToken)
    private readonly applicantRepository: IApplicantRepository
  ) {}
  async create(createApplicantDto: CreateApplicantDto, userId: number) {
    return await this.applicantRepository.create(createApplicantDto, userId);
  }

  async findAll(findById: FindById) {
    return await this.applicantRepository.list(findById);
  }

  async findOne(findById: FindById) {
    return await this.applicantRepository.findById(findById);
  }

  async update(
    id: number,
    updateTransportDto: UpdateApplicantDto,
    userId: number,
  ) {
    return await this.applicantRepository.update(
      id,
      updateTransportDto,
      userId,
    );
  }

  async remove(findById: FindById, userId: number) {
    return await this.applicantRepository.delete(findById, userId);
  }
}
