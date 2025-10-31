import { Inject, Injectable } from "@nestjs/common";
import { IReporterRepositoryToken } from "../tokens/reporter-repository.tokens";
import { IReporterRepository } from "src/domain/ag_reporter/interface/reporter-repository.interface";
import { UpdateReporterDto } from "src/presentation/dtos/ag_reporter/update-reporter.dto";
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { FindById } from "src/common/dto/findById.dto";
@Injectable()
export class UpdateReporterUseCase{
    constructor(
        @Inject(IReporterRepositoryToken)
        private readonly reporterRepository: IReporterRepository
    ){}

    async execute (updateReporterId:FindByUuid, updateReporterDto:UpdateReporterDto, userId:FindById){
        return await this.reporterRepository.update(updateReporterId, updateReporterDto, userId);
    }
}