/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateTestResultDto,
    UpdateTestResultDto,
    ListTestResultDto,
} from 'src/presentation/dtos/cc_test_result/index.dto';

export interface ITestResultRepository {
    create(dto: CreateTestResultDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateTestResultDto, user: number): Promise<AnswerQuery | null>;
    listBySampling(dto: FindById): Promise<AnswerQuery | null>;
    listByCusdtody(dto: ListTestResultDto): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
}