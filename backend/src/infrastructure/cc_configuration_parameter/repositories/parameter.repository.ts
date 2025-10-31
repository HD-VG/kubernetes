/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { IParameterRepository } from 'src/domain/cc_configuration_parameter/interface/parameter-repository.interface';
import { ConfigurationParameter } from 'src/domain/shared/index.entity';
import {
  CreateParameterDto,
  UpdateParameterDto,
} from 'src/presentation/dtos/cc_configuration_parameter/index-parameter.dto';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ConfigurationParameterRepository implements IParameterRepository {
  constructor(
    @InjectRepository(ConfigurationParameter)
    private readonly parameterRepository: Repository<ConfigurationParameter>,
  ) {}

  async create(dto: CreateParameterDto, user: number): Promise<AnswerQuery> {
    try {
      const newparameter = ConfigurationParameter.create(dto, user);
      await this.parameterRepository.save(newparameter);
      return { status: true, message: ResponseMessages.RECORD_CREATED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async update(
    id: number,
    dto: UpdateParameterDto,
    user: number,
  ): Promise<AnswerQuery> {
    try {
      const data = await this.parameterRepository.findOneOrFail({
        where: { id },
      });
      data.update(dto, user);
      await this.parameterRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_MODIFIED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async delete(findById: FindById, user: number): Promise<AnswerQuery> | null {
    try {
      const data = await this.parameterRepository.findOneBy({
        id: findById.id,
      });
      data.delete(user);
      await this.parameterRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_DELETED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async list(): Promise<AnswerQuery> {
    try {
      const [data, count] = await this.parameterRepository.findAndCount({
        where: { deleteAt: IsNull() },
        order: { createAt: 'desc' },
      });
      const transformer = data.map((d) => d.list());
      if (count == null) {
        return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
      }
      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: transformer,
        total: count,
      };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async findById(dto: FindById): Promise<AnswerQuery> {
    try {
      const parameter = await this.parameterRepository.findOneBy({
        id: dto.id,
        deleteAt: IsNull(),
      });
      if (!parameter) {
        return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
      }
      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: parameter,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
