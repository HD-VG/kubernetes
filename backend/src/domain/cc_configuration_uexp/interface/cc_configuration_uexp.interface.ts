/* eslint-disable prettier/prettier */
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import {
  CreateConfigurationUexpDto,
  UpdateConfigurationUexpDto
} from 'src/presentation/dtos/cc_configuration_uexp/index.dto';

export interface IConfigurationUexpRepository {
  create(dto: CreateConfigurationUexpDto, userId: number): Promise<AnswerQuery> | null;
  update(
    id: number,
    dto: UpdateConfigurationUexpDto,
    userId: number,
  ): Promise<AnswerQuery> | null;
  delete(findById: FindById, userId: number): Promise<AnswerQuery> | null;
  list(): Promise<AnswerQuery>;
  findById(dto: FindById): Promise<AnswerQuery | null>;
}
