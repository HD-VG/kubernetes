/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateConfigurationCalculationDto,
    UpdateConfigurationCalculationDto
} from 'src/presentation/dtos/cc_configuration_calculations/index.dto';

export interface IConfigurationCalculationRepository {
    create(dto: CreateConfigurationCalculationDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateConfigurationCalculationDto, user: number): Promise<AnswerQuery | null>;
    listConfigurations(): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    findOne(id: number): Promise<AnswerQuery | null>;
    disabled(): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
    modify_status(findById: FindById, userId: number): Promise<AnswerQuery | null>;
    modify_status_apps(findById: FindById, userId: number): Promise<AnswerQuery | null>;
}