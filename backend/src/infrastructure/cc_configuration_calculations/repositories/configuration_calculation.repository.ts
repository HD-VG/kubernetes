/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
    CreateConfigurationCalculationDto,
    UpdateConfigurationCalculationDto,
} from 'src/presentation/dtos/cc_configuration_calculations/index.dto';
import {
    AnswerQuery,
    FindById,
} from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ConfigurationCalculation } from 'src/domain/cc_configuration_calculations/entities/configuration_calculation.entity';
import { IConfigurationCalculationRepository } from 'src/domain/cc_configuration_calculations/interface/configuration_calculation.interface';

@Injectable()
export class ConfigurationCalculationRepository implements IConfigurationCalculationRepository {
    constructor(
        @InjectRepository(ConfigurationCalculation)
        private readonly configurationCalculationRepository: Repository<ConfigurationCalculation>,
    ) { }
    async disabled(): Promise<AnswerQuery> {
        const existingConfigurations = await this.configurationCalculationRepository.find();
        if (existingConfigurations) {
            for (const config of existingConfigurations) {
                config.statusConfiguration = false;
                // await this.configurationCalculationRepository.save(config);
            }
        }
        return { status: true, message: ResponseMessages.RECORD_MODIFIED }
    }
    async create(
        CreateConfigurationCalculationDto: CreateConfigurationCalculationDto,
        id: number,
    ): Promise<AnswerQuery> {
        try {
            this.disabled();
            const adminConfiguration = ConfigurationCalculation.create(CreateConfigurationCalculationDto, id)
            const response = await this.configurationCalculationRepository.save(adminConfiguration);
            if (response) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async update(
        id: number,
        UpdateConfigurationCalculationDto: UpdateConfigurationCalculationDto,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.configurationCalculationRepository.findOneBy({ id });
            find.update(UpdateConfigurationCalculationDto, userId)
            const result = await this.configurationCalculationRepository.save(find);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const configuration = await this.configurationCalculationRepository.findOne({ where: { id: findById.id } })
            if (!configuration) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: configuration, }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async findOne(id: number): Promise<AnswerQuery> {
        try {
            const configuration = await this.configurationCalculationRepository.findOneBy({ id })
            if (!configuration) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: configuration, }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async listConfigurations(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationCalculationRepository.findAndCount({
                where: {
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            });
            const transform = data.map(config => config.toResponse());
            if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, all: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async modify_status(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const find = await this.configurationCalculationRepository.findOne({ where: { id: findById.id } });
            if (find.statusConfiguration) { find.desactive(userId); await this.configurationCalculationRepository.save(find); }
            else { find.active(userId); await this.configurationCalculationRepository.save(find); }
            return { message: ResponseMessages.RECORD_MODIFIED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async modify_status_apps(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const find = await this.configurationCalculationRepository.findOne({ where: { id: findById.id } });
            if (find.approvedByApps) { find.desactiveApps(userId); await this.configurationCalculationRepository.save(find); }
            else { find.activeApps(userId); await this.configurationCalculationRepository.save(find); }
            return { message: ResponseMessages.RECORD_MODIFIED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const find = await this.configurationCalculationRepository.findOne({ where: { id: findById.id } });
            find.softDelete(userId);
            await this.configurationCalculationRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
}