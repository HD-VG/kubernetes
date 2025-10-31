/* eslint-disable prettier/prettier */
import {
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateReportTemplateDto,
    UpdateReportTemplateDto
} from 'src/presentation/dtos/cc_report_template/index.dto'
import { AnswerQuery, FindById } from 'src/common/dto/index.dto';
import { IsNull, Repository } from 'typeorm';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ReportTemplate } from 'src/domain/shared/index.entity';
import { IReportTemplateRepository } from 'src/domain/cc_report_template/interface/report-template-repository.interface';

@Injectable()
export class ReportTemplateRepository implements IReportTemplateRepository{
  constructor(
    @InjectRepository(ReportTemplate)
    private readonly templateRepo: Repository<ReportTemplate>
  ) {}

  async create(dto: CreateReportTemplateDto, userId: number): Promise<AnswerQuery> {
    try {
      const template = ReportTemplate.create(dto, userId);
      await this.templateRepo.save(template);
      return { status: true, message: ResponseMessages.RECORD_CREATED };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async update(id: number, dto: UpdateReportTemplateDto, userId: number): Promise<AnswerQuery> {
    try {
      const template = await this.templateRepo.findOneBy({ id });
      if (!template) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };

      template.update(dto, userId);
      await this.templateRepo.save(template);

      return { status: true, message: ResponseMessages.RECORD_MODIFIED };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
    try {
      const template = await this.templateRepo.findOneBy({ id: findById.id });
      if (!template) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };

      template.softDelete(userId);
      await this.templateRepo.save(template);

      return { status: true, message: ResponseMessages.RECORD_DELETED };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async list(codeCustody: string): Promise<AnswerQuery> {
    try {
      const [data, count] = await this.templateRepo.findAndCount({
        where: { 
          codeCustody: codeCustody,
          deleteAt: IsNull() 
        },
        order: { name: 'ASC' },
      });

      if (!count) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };

      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: data.map(t => t.toResponse()),
        all: count,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  async findById(findById: FindById): Promise<AnswerQuery> {
    try {
      const template = await this.templateRepo.findOneBy({ id: findById.id });
      if (!template) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };

      return {
        status: true,
        message: ResponseMessages.RECORDS_FOUND,
        data: [template.toResponse()],
        all: 1,
      };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }
}