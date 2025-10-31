import { Inject, Injectable } from "@nestjs/common";
import { IReporterRepositoryToken } from "../tokens/reporter-repository.tokens";
import { IReporterRepository } from "src/domain/ag_reporter/interface/reporter-repository.interface";
import { FindByUuid } from "src/common/dto/findByUuid.dto";

@Injectable()
export class FindByIdReporterUseCase{
    constructor(
        @Inject(IReporterRepositoryToken)
        private readonly reporterRepository: IReporterRepository
    ){}

    async execute (viewReporterId: FindByUuid){
        return await this.reporterRepository.findById(viewReporterId);
    }
}