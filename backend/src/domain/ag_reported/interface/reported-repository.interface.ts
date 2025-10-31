import { AnswerQuery } from "src/common/dto/answer.dto";
import { FindById } from "src/common/dto/findById.dto";
import { FindByUuid } from "src/common/dto/findByUuid.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { CreateReportedDto } from "src/presentation/dtos/ag_reported/create-reported.dto";
import { UpdateReportedDto } from "src/presentation/dtos/ag_reported/update-reported.dto";

export interface IReportedRepository {
    create(createReportedDto: CreateReportedDto, userId:FindById): Promise<AnswerQuery | null> ;
    update(updateReportedId:FindByUuid, updateReportedDto: UpdateReportedDto, userId: FindById): Promise<AnswerQuery> | null;
    delete(deleteReportedId: FindByUuid, userId:FindById): Promise<AnswerQuery | null>;
    list(): Promise<AnswerQuery>;
    findById(viewReportedId: FindByUuid): Promise<AnswerQuery | null>;
    list_pagintation(paginationDto: PaginationDto): Promise<AnswerQuery | null>;
}