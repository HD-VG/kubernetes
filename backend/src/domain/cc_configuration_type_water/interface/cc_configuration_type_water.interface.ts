/* eslint-disable prettier/prettier */
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import {
  CreateTypeWaterDto,
  UpdateTypeWaterDto
} from 'src/presentation/dtos/cc_configuration_type_water/index.dto';

export interface IConfigurationTypeWaterRepository {
  create(dto: CreateTypeWaterDto, userId: number): Promise<AnswerQuery> | null;
  update(
    id: number,
    dto: UpdateTypeWaterDto,
    userId: number,
  ): Promise<AnswerQuery> | null;
  delete(findById: FindById, userId: number): Promise<AnswerQuery> | null;
  list(): Promise<AnswerQuery>;
  findById(dto: FindById): Promise<AnswerQuery | null>;
}
