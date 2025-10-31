/* eslint-disable prettier/prettier */
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { 
  CreateLimitDto,
  UpdateLimitDto
} from 'src/presentation/dtos/cc_configuration_limit/index-limit.dto';

export interface ILimitRepository {
  create(dto: CreateLimitDto, userId: number): Promise<AnswerQuery | null>;
  update(
    id: number,
    dto: UpdateLimitDto,
    userId: number,
  ): Promise<AnswerQuery | null>;
  delete(findById: FindById, userId: number): Promise<AnswerQuery | null>;
  list(): Promise<AnswerQuery>;
  toConfiguration(): Promise<AnswerQuery>;
  findById(dto: FindById): Promise<AnswerQuery | null>;
}
