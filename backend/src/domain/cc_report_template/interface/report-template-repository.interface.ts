/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateReportTemplateDto,
    UpdateReportTemplateDto
} from 'src/presentation/dtos/cc_report_template/index.dto';

export interface IReportTemplateRepository {
  create(dto: CreateReportTemplateDto, userId: number): Promise<AnswerQuery>;
  update(id: number, dto: UpdateReportTemplateDto, userId: number): Promise<AnswerQuery>;
  delete(findById: FindById, userId: number): Promise<AnswerQuery>;
  list(codeCustody: string): Promise<AnswerQuery>;
  findById(findById: FindById): Promise<AnswerQuery>;
}