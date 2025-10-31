/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateApplicantDto,
    UpdateApplicantDto
} from 'src/presentation/dtos/cc_applicant/index.dto';
import { Applicant } from '../entities/applicant.entity';

export interface IApplicantRepository {
    create(dto: CreateApplicantDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateApplicantDto, user: number): Promise<AnswerQuery | null>;
    list(dto: FindById): Promise<AnswerQuery | null>;
    findByCustodyId(id: number): Promise<Applicant | null>;
    // findCustody(id: number): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
}