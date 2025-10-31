/* eslint-disable prettier/prettier */
import { FindById,AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateSamplingDto,
    UpdateSamplingDto,
    UpdateSamplingLaboratoryDto
} from 'src/presentation/dtos/cc_sampling/index.dto';

export interface ISamplingRepository {
    create(dto: CreateSamplingDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateSamplingDto, user: number): Promise<AnswerQuery | null>;
    updateLaboratory(id: number, dto: UpdateSamplingLaboratoryDto, user: number): Promise<AnswerQuery | null>;
    list(dto: FindById): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
}