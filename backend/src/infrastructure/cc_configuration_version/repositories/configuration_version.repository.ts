/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
    CreateAdminConfigurationDto,
    UpdateAdminConfigurationDto,
} from 'src/presentation/dtos/cc_configuration_version/index.dto';
import {
    AnswerQuery,
    FindById,
} from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ConfigurationVersion } from 'src/domain/cc_configuration_version/entites/version_configuration.entity';

@Injectable()
export class ConfigurationVersionRepository {
    constructor(
        @InjectRepository(ConfigurationVersion)
        private readonly configurationVersionRepository: Repository<ConfigurationVersion>,
    ) { }
    async disabled(): Promise<AnswerQuery> {
        const existingConfigurations = await this.configurationVersionRepository.find();
        if (existingConfigurations) {
            for (const config of existingConfigurations) {
                config.statusConfiguration = false;
                await this.configurationVersionRepository.save(config);
            }
        }
        return { status: true, message: ResponseMessages.RECORD_MODIFIED }
    }
    async create(
        createAdminConfigurationDto: CreateAdminConfigurationDto,
        id: number,
    ): Promise<AnswerQuery> {
        try {
            this.disabled();
            const adminConfiguration = ConfigurationVersion.create(createAdminConfigurationDto, id)
            const response = await this.configurationVersionRepository.save(adminConfiguration);
            if (response) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async update(
        updateAdminConfigurationDto: UpdateAdminConfigurationDto,
        id: number,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.configurationVersionRepository.findOneBy({ id });
            find.update(updateAdminConfigurationDto, userId)
            const result = await this.configurationVersionRepository.save(find);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const configuration = await this.configurationVersionRepository.findOne({ where: { id: findById.id } })
            if (!configuration) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: configuration, }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async findOne(id: number): Promise<AnswerQuery> {
        try {
            const configuration = await this.configurationVersionRepository.findOneBy({ id })
            if (!configuration) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: configuration, }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async listConfigurations(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationVersionRepository.findAndCount({
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
            const find = await this.configurationVersionRepository.findOne({ where: { id: findById.id } });
            if (find.statusConfiguration) { find.desactive(userId); await this.configurationVersionRepository.save(find); }
            else { find.active(userId); await this.configurationVersionRepository.save(find); }
            return { message: ResponseMessages.RECORD_MODIFIED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const find = await this.configurationVersionRepository.findOne({ where: { id: findById.id } });
            find.softDelete(userId);
            await this.configurationVersionRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
}