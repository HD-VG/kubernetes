import { Inject, Injectable } from "@nestjs/common";
import { IReporterRepositoryToken } from "../tokens/reporter-repository.tokens";
import { IReporterRepository } from "src/domain/ag_reporter/interface/reporter-repository.interface";

@Injectable()
export class ListReporterUseCase{
    constructor(
        @Inject(IReporterRepositoryToken)
        private readonly reporterRepository: IReporterRepository
    ){}

    async execute(){
        return await this.reporterRepository.list();
    }
}