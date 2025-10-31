import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";

@Injectable()
export class ListReportedUseCase{
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository
    ){}

    async execute(){
        return await this.reportedRepository.list();
    }
}