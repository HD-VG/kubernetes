/* eslint-disable prettier/prettier */
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import {
  CreateStandardDto,
  UpdateStandardDto
} from 'src/presentation/dtos/cc_configuration_standard/index-standard.dto';

export interface IStandardRepository {
  create(dto: CreateStandardDto, userId: number): Promise<AnswerQuery> | null;
  update(
    id: number,
    dto: UpdateStandardDto,
    userId: number,
  ): Promise<AnswerQuery> | null;
  delete(findById: FindById, userId: number): Promise<AnswerQuery> | null;
  list(): Promise<AnswerQuery>;
  findById(dto: FindById): Promise<AnswerQuery | null>;
}
