/* eslint-disable prettier/prettier */
import { FindById, FindByUuid, AnswerQuery } from "src/common/dto/index.dto";
import { CreateRegisterDto, 
    UpdateRegisterDto,  
    SnapshotDTO, 
    LetterDto } from "src/presentation/dtos/ag_register/index.dto";
export interface IRegisterRepository {
    create(createRegisterDto: CreateRegisterDto, userId: FindById): Promise<AnswerQuery | null>;
    update(updateRegisterId: FindByUuid,updateRegisterDto: UpdateRegisterDto,userId: FindById): Promise<AnswerQuery | null>;
    delete(deleteRegisterId: FindByUuid, userId: FindById): Promise<AnswerQuery | null>;
    list(): Promise<AnswerQuery>;
    findById(viewRegisterId: FindByUuid): Promise<AnswerQuery | null>;
    /////////////////////////////////////////////
    changeState(changeStateId: FindByUuid): Promise<AnswerQuery>
    getSnapshot(getSnapshotId: number): Promise<SnapshotDTO>
    printResumen(resumenId: FindByUuid): Promise<AnswerQuery>
    sumAmountsByMonth()
    sumAmountByRegisterId(registerId: FindByUuid): Promise<LetterDto>
    generateReportByMonthAndYear(month: number, year: number)
    printRegister(printId: FindByUuid)
}