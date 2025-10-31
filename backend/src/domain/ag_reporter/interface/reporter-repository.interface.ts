import { AnswerQuery } from "src/common/dto/answer.dto";
import { FindById } from "src/common/dto/findById.dto";
import { CreateReporterDto } from "src/presentation/dtos/ag_reporter/create-reporter.dto";
import { UpdateReporterDto } from "src/presentation/dtos/ag_reporter/update-reporter.dto";
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

export interface IReporterRepository{
    create (createReporterDto: CreateReporterDto, userId:FindById): Promise<AnswerQuery | null>;
    update(updateReportedId:FindByUuid,updateReportedDto: UpdateReporterDto,userId: FindById): Promise<AnswerQuery | null>;
    delete(deleteReportedId: FindByUuid, userId:FindById): Promise<AnswerQuery | null>;
    list(): Promise<AnswerQuery>;
    findById(viewReportedId: FindByUuid): Promise<AnswerQuery | null>;
}