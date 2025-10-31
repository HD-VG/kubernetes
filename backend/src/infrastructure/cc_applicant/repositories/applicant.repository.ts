/* eslint-disable prettier/prettier */
import {
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Applicant } from '../../../domain/cc_applicant/entities/applicant.entity';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity';
import { CreateApplicantDto, UpdateApplicantDto } from 'src/presentation/dtos/cc_applicant/index.dto';
import { AnswerQuery, FindById } from 'src/common/dto/index.dto';
import { IsNull, Repository } from 'typeorm';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { IApplicantRepository } from 'src/domain/cc_applicant/interface/applicant.interface';

@Injectable()
export class ApplicantRepository implements IApplicantRepository{

    constructor(
        @InjectRepository(Applicant)
        private readonly applicantRepository: Repository<Applicant>,
        @InjectRepository(ChainOfCustody)
        private readonly chainOfCustodyRepository: Repository<ChainOfCustody>,
    ) { }

    async create(createTransportDto: CreateApplicantDto, userId: number): Promise<AnswerQuery> {
        try {
            const chainOfCustody = await this.chainOfCustodyRepository.findOneBy({ id: createTransportDto.chainOfCustody })
            if (!chainOfCustody) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND } }
            const applicant = Applicant.create(createTransportDto, chainOfCustody, userId);
            const data = await this.applicantRepository.save(applicant)
            if (data) {
                return { status: true, message: ResponseMessages.RECORD_CREATED, }
            } else {
                return { status: false, message: ResponseMessages.SERVER_ERROR }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.BAD_REQUEST }
        }
    }
    async update(id: number, updateApplicantDto: UpdateApplicantDto, userId: number): Promise<AnswerQuery> {
        try {
            const sampling = await this.applicantRepository.findOneByOrFail({ id: updateApplicantDto.id })
            sampling.update(updateApplicantDto, userId);
            const data = await this.applicantRepository.save(sampling);
            if (data) {
                return { status: true, message: ResponseMessages.RECORD_CREATED, }
            } else {
                return { status: false, message: ResponseMessages.SERVER_ERROR }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.SERVER_ERROR }
        }
    }
    async list(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.applicantRepository.findAndCount({
                where: {
                    chainOfCustody: {
                        id: findById.id
                    },
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            })
            const transform = data.map(data => data.toResponse())
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.SERVER_ERROR }
        }
    }
    async findByCustodyId(id: number): Promise<Applicant> {
        return this.applicantRepository.findOne({
            where: {
                chainOfCustody: { id },
            },
        });
    }
    async findById(findById: FindById) {
        try {
            const [data, count] = await this.applicantRepository.findAndCount({
                where: {
                    id: findById.id,
                    deleteAt: IsNull(),
                }
            })
            const transform = data.map(data => data.toResponse())
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                }
            } else {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false }
            }
        } catch (error) {
            return { status: false, message: error.message || ResponseMessages.SERVER_ERROR }
        }
    }
    async delete(
        findById: FindById,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.applicantRepository.findOneBy({ id: findById.id });
            find.softDelete(userId);
            const data1 = await this.applicantRepository.save(find);
            if (data1) {
                return {  message: ResponseMessages.RECORD_DELETED, status: true }
            } else {
                return { message: ResponseMessages.SERVER_ERROR, status: false }
            }
        } catch (error) {
            return { message: error.message || ResponseMessages.SERVER_ERROR, status: false }
        }
    }
}