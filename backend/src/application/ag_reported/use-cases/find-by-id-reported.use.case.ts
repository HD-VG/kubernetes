import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";
import { FindByUuid } from "src/common/dto/findByUuid.dto";

@Injectable()
export class FindByIdReportedUseCase{
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository
    ){}

    async execute (viewReportedId: FindByUuid){
        return await this.reportedRepository.findById(viewReportedId);
    }
}