/* eslint-disable prettier/prettier */

import { Injectable, } from '@nestjs/common';
import { Reporter } from 'src/domain/ag_reporter/entities/reporter.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReporterDto, UpdateReporterDto } from 'src/presentation/dtos/ag_reporter/index.dto';
import { AnswerQuery, FindById } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { IReporterRepository } from 'src/domain/ag_reporter/interface/reporter-repository.interface';
@Injectable()
export class ReporterRepository implements IReporterRepository{
    constructor(
        @InjectRepository(Reporter)
        private readonly reporterRepository: Repository<Reporter>,
    ) { }

    async create(createReportedDto: CreateReporterDto, user: FindById): Promise<AnswerQuery> {
        try {
            const newreporter = Reporter.create(createReportedDto, user.id);
            await this.reporterRepository.save(newreporter);
            return { status: true, message: ResponseMessages.RECORD_CREATED };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async list(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.reporterRepository.findAndCount({
                where: { deleteAt: IsNull() },
                order: { createAt: 'desc' }
            });
            const transformer = data.map((d) => d.getResponse());
            if (count === 0) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }
            return {
                status: true,
                message: ResponseMessages.RECORDS_FOUND,
                data: transformer,
                total: count
            };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async findById(viewReporterId: FindByUuid): Promise<AnswerQuery> {
        try {
            const reporter = await this.reporterRepository.findOneBy({
                uuid: viewReporterId.uuid,
                deleteAt: IsNull(),
            });
            if (!reporter) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }
            return {
                status: true,
                message: ResponseMessages.RECORDS_FOUND,
                data: reporter,
            }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async update(
        updateReporterId: FindByUuid,
        updateReporterDto: UpdateReporterDto,
        user: FindById,
    ): Promise<AnswerQuery> {
        try {
            const data = await this.reporterRepository.findOne({
                where: { uuid:updateReporterId.uuid },
            });
            data.update( updateReporterDto, user.id);
            await this.reporterRepository.save(data);
            return { status: true, message: ResponseMessages.RECORD_MODIFIED }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async delete(deleteReporterId: FindByUuid, user: FindById): Promise<AnswerQuery> | null {
        try {
            const data = await this.reporterRepository.findOneBy({
                uuid: deleteReporterId.uuid,
            });
            data.delete(user.id);
            await this.reporterRepository.save(data);
            return { status: true, message: ResponseMessages.RECORD_DELETED };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
}