/* eslint-disable prettier/prettier */
import { FindById,AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateAdminConfigurationDto,
    UpdateAdminConfigurationDto
} from 'src/presentation/dtos/cc_configuration_version/index.dto';

export interface IConfigurationVersionRepository {
    create(dto: CreateAdminConfigurationDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateAdminConfigurationDto, user: number): Promise<AnswerQuery | null>;
    listConfigurations(): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    findOne(id: number): Promise<AnswerQuery | null>;
    disabled(): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
    modify_status(findById: FindById, userId: number): Promise<AnswerQuery | null>;
}