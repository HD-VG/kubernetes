/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';
import { ConfigurationLimit, ConfigurationParameter, ConfigurationStandard } from 'src/domain/shared/index.entity';
import {
  CreateLimitDto,
  UpdateLimitDto,
} from 'src/presentation/dtos/cc_configuration_limit/index-limit.dto';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ConfigurationLimitRepository implements ILimitRepository {
  constructor(
    @InjectRepository(ConfigurationLimit)
    private readonly limitRepository: Repository<ConfigurationLimit>,
    @InjectRepository(ConfigurationParameter)
    private readonly parameterRepository: Repository<ConfigurationParameter>,
    @InjectRepository(ConfigurationStandard)
    private readonly standardRepository: Repository<ConfigurationStandard>,
  ) { }

  async create(dto: CreateLimitDto, user: number): Promise<AnswerQuery> {
    try {
      const parameter = await this.parameterRepository.findOneBy({
        id: dto.parameterId,
      });
      if (!parameter) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND + " PARAMETROS" }; }
      const standard = await this.standardRepository.findOneBy({
        id: dto.standardId,
      });
      if (!standard) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND + " ESTANDARES" }; }
      const newlimit = ConfigurationLimit.create(dto, parameter, standard, user);
      await this.limitRepository.save(newlimit);
      return { status: true, message: ResponseMessages.RECORD_CREATED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async update(
    id: number,
    dto: UpdateLimitDto,
    user: number,
  ): Promise<AnswerQuery> {
    try {
      const data = await this.limitRepository.findOneOrFail({ where: { id } });
      data.update(dto, user);
      await this.limitRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_MODIFIED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async delete(findById: FindById, user: number): Promise<AnswerQuery> | null {
    try {
      const data = await this.limitRepository.findOneBy({ id: findById.id });
      data.delete(user);
      await this.limitRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_DELETED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async list(): Promise<AnswerQuery> {
    try {
      const [limits, total] = await this.limitRepository.findAndCount({
        relations: ['parameter', 'standard'],
        where: { deleteAt: IsNull() },
        order: { createAt: 'DESC' },
      });

      if (!limits.length) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }

      const data = limits.map(limit => limit.list());

      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data,
        total,
      };
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async toConfiguration(): Promise<AnswerQuery> {
    try {
      const [limits, total] = await this.limitRepository.findAndCount({
        relations: ['parameter', 'standard'],
        where: { deleteAt: IsNull() },
        order: { createAt: 'DESC' },
      });

      if (!limits.length) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }

      const data = limits.map(limit => ({
        id: `${limit.id}_${limit.parameter?.id ?? ''}_${limit.standard?.id ?? ''}`,
        value: `${limit.standard?.name ?? ''} - ${limit.standard?.type ?? ''} - ${limit.parameter?.name ?? ''}`,
      }));

      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data,
        total,
      };
    } catch (error) {
      return {
        status: false,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  }


  async findById(dto: FindById): Promise<AnswerQuery> {
    try {
      const limit = await this.limitRepository.findOneBy({
        id: dto.id,
        deleteAt: IsNull(),
      });
      if (!limit) {
        return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
      }
      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: limit,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
