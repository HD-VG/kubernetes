/* eslint-disable prettier/prettier */
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { 
  CreateParameterDto, 
  UpdateParameterDto 
} from 'src/presentation/dtos/cc_configuration_parameter/index-parameter.dto';

export interface IParameterRepository {
  create(dto: CreateParameterDto, userId: number): Promise<AnswerQuery | null>;
  update(
    id: number,
    dto: UpdateParameterDto,
    userId: number,
  ): Promise<AnswerQuery | null>;
  delete(findById: FindById, userId: number): Promise<AnswerQuery | null>;
  list(): Promise<AnswerQuery>;
  findById(dto: FindById): Promise<AnswerQuery | null>;
}
