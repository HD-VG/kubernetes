import { Inject, Injectable } from "@nestjs/common";
import { IReporterRepositoryToken } from "../tokens/reporter-repository.tokens";
import { IReporterRepository } from "src/domain/ag_reporter/interface/reporter-repository.interface";
import { FindById } from "src/common/dto/findById.dto";
import { FindByUuid } from "src/common/dto/findByUuid.dto";

@Injectable()
export class DeleteReporterUseCase{
    constructor(
        @Inject(IReporterRepositoryToken)
        private readonly reporterRepository: IReporterRepository
    ){}

    async execute(deleteReporterId: FindByUuid, userId:FindById){
        return await this.reporterRepository.delete(deleteReporterId,userId);
    }
}