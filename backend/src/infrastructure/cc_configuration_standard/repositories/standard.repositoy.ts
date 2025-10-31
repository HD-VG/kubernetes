/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ConfigurationStandard } from 'src/domain/cc_configuration_standard/entities/standard.entity';
import { IStandardRepository } from 'src/domain/cc_configuration_standard/interface/standard-repository.interface';
import {
  CreateStandardDto,
  UpdateStandardDto,
} from 'src/presentation/dtos/cc_configuration_standard/index-standard.dto';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class ConfigurationStandardRepository implements IStandardRepository {
  constructor(
    @InjectRepository(ConfigurationStandard)
    private readonly standardRepository: Repository<ConfigurationStandard>,
  ) {}

  async create(dto: CreateStandardDto, user: number): Promise<AnswerQuery> {
    try {
      const newstandard = ConfigurationStandard.create(dto, user);
      await this.standardRepository.save(newstandard);
      return { status: true, message: ResponseMessages.RECORD_CREATED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async update(
    id: number,
    dto: UpdateStandardDto,
    user: number,
  ): Promise<AnswerQuery> {
    try {
      const data = await this.standardRepository.findOneOrFail({
        where: { id },
      });
      data.update(dto, user);
      await this.standardRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_MODIFIED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async delete(findById: FindById, user: number): Promise<AnswerQuery> | null {
    try {
      const data = await this.standardRepository.findOneBy({ id: findById.id });
      data.delete(user);
      await this.standardRepository.save(data);
      return { status: true, message: ResponseMessages.RECORD_DELETED };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }

  async list(): Promise<AnswerQuery> {
    try {
      const [data, count] = await this.standardRepository.findAndCount({
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
      const standard = await this.standardRepository.findOneBy({
        id: dto.id,
        deleteAt: IsNull(),
      });
      if (!standard) {
        return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
      }
      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: standard,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}
