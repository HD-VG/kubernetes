/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindById, FindByUuid, AnswerQuery } from "src/common/dto/index.dto";
import { ResponseMessages } from "src/common/enum/answers.enum";
import { Register } from "src/domain/ag_register/entities/register.entity";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";
import { CreateRegisterDto, 
    UpdateRegisterDto,  
    SnapshotDTO, 
    LetterDto } from "src/presentation/dtos/ag_register/index.dto";
import { RegisterService } from "../services/register.service";
import { IsNull, Repository ,Between} from "typeorm";

@Injectable()
export class RegisterRepository implements IRegisterRepository {
    constructor(
        @InjectRepository(Register)
        private readonly registerRepository: Repository<Register>,
        private readonly registerService: RegisterService
    ) { }

    async create(createRegisterDto: CreateRegisterDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const validations = await this.registerService.groupValidation(createRegisterDto);
            const createRegister = Register.create(createRegisterDto,validations,userId.id);
            const resultCreateRecurring = await this.registerRepository.save(createRegister);
            return { status: true, message: ResponseMessages.RECORD_CREATED,data: resultCreateRecurring.getResponse(),   };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async update(
            updateId: FindByUuid,
            updateRegisterDto: UpdateRegisterDto,
            userId: FindById,
        ): Promise<AnswerQuery> {
            try {
            const updateRegister = await this.registerRepository.findOneBy({ uuid: updateId.uuid });
            const validations = await this.registerService.groupValidation(updateRegisterDto);
            updateRegister.update(updateRegisterDto,validations, userId.id);
            const resultUpdateRegister = await this.registerRepository.save(updateRegister);
            return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: resultUpdateRegister.getResponse() };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async delete(deleteId: FindByUuid, userId: FindById): Promise<AnswerQuery> | null {
        try {
            const deleteRegister = await this.registerRepository.findOneBy({ uuid: deleteId.uuid });
            deleteRegister.delete(userId.id);
            await this.registerRepository.save(deleteRegister);
            return { status: true, message: ResponseMessages.RECORD_DELETED , data: deleteRegister.getResponse()};
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async list(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.registerRepository.findAndCount({
                where: { deleteAt: IsNull() },
                order: { createAt: 'desc' },
            });
            const transformer = data.map((d) => d.getResponse());
            if (count == null) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }
            return {
                status: true,
                message: ResponseMessages.RECORDS_FOUND,
                data: transformer,
                total: count,
            };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async findById(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const register = await this.registerRepository.findOneBy({uuid: viewId.uuid,deleteAt: IsNull(),});
            if (!register) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }
            return {
                status: true,
                message: ResponseMessages.RECORDS_FOUND,
                data: register,
            };
        } catch (error) {
            return { status: false, message: error.message };
        }
    }
    //implementar la logica de los reportes 
    async changeState(changeStateIdId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data1 = await this.registerRepository.findOneBy({ uuid: changeStateIdId.uuid });
            const snapshot: SnapshotDTO = await this.getSnapshot(data1.id)
            data1.state = true;
            data1.snapshot = snapshot;
            const data = await this.registerRepository.save(data1);
            return { status: true, message: ResponseMessages.RECORD_CREATED,data: data.getResponse(), };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async getSnapshot(id: number): Promise<SnapshotDTO> {
        const result = await this.registerRepository.find({
            where: { deleteAt: IsNull(), id: id, 
                configurationCar: { deleteAt: IsNull() }, 
                configurationTypeMaterials: { deleteAt: IsNull() } },
            relations: [
                'reporter',
                'reported',
                'configurationUtil',
                'configurationTypeMachines',
                'configurationTypeDagmes',
                'configurationTypeWorks',
                'assignment_user',
                'configurationTypeMaterials',
                'configurationCar'
            ]
        });
        console.log("llego a get reppsotoy")
        if (!result.length) {
            throw new Error('No data found');
        }
        return  this.registerService.getSnapshot(result[0]);
    }
    async printResumen(resumenId: FindByUuid): Promise<AnswerQuery> {
        try {
            const register = await this.registerRepository.findOneBy({ uuid: resumenId.uuid });
            const result = await this.registerRepository.find({
                where: { deleteAt: IsNull(), id: register.id },
                relations: [
                    'reporter',
                    'reported',
                    'configurationUtil',
                    'configurationTypeMachines',
                    'configurationTypeDagmes',
                    'configurationTypeWorks',
                    'assignment_user',
                    'configurationTypeMaterials',
                    'configurationCar'
                ]
            });
            if (result) {
                const formattedData = await this.registerService.printResumen(register,result);
                return {status: true, message: ResponseMessages.RECORDS_FOUND, data: formattedData};
            } else {
                return {status: true,message: ResponseMessages.NO_RECORDS_FOUND
                };
            }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async printRegister(printId: FindByUuid) {
        try {
            const register = await this.registerRepository.findOneBy({ uuid: printId.uuid });
            const water = await this.registerService.getWater()
            const recurring = await this.registerService.getRecurring()
            const result = await this.registerRepository.find({
                where: { deleteAt: IsNull(), id: register.id },
                relations: [
                    'reporter',
                    'reported',
                    'configurationUtil',
                    'configurationTypeMachines',
                    'configurationTypeDagmes',
                    'configurationTypeWorks',
                    'assignment_user',
                    'configurationTypeMaterials',
                    'configurationCar'
                ]
            });
            const printRegister = await this.registerService.printRegister(register,water,recurring,result);
            return { status: true, message: ResponseMessages.RECORDS_FOUND,data: printRegister };
        } catch (error) {
        }
    }
    async sumAmountsByMonth() {
        try{
            console.log("llego a sumAmountsByMonth repository")
            const currentYear = new Date().getFullYear();
            const registers = await this.registerRepository.find({
                where: { deleteAt: null, state: true, dateDagme: Between(new Date(currentYear, 0, 1), new Date(currentYear + 1, 0, 1)) }
            });
            console.log("registers",registers)
            const sumAmountsByMonth = await this.registerService.sumAmountsByMonth(registers);
            console.log("sumAmountsByMonth",sumAmountsByMonth)
            return { status: true, message: ResponseMessages.RECORD_CREATED,data: sumAmountsByMonth };
        }catch(error){
            return { status: false, message: error.message || error };
        }
    }
    async sumAmountByRegisterId(registerId: FindByUuid): Promise<LetterDto> {
        try{
            const register = await this.registerRepository.findOne({
            where: { uuid:registerId.uuid, deleteAt: null, state: true },
            relations: ['reporter', 'reported'] // Join with reporter to get the name and lastname
        });
            if (!register) {
                throw new Error(`Register with ID ${registerId} not found.`);
            }else{
                const letterDto: LetterDto = await this.registerService.sumAmountByRegisterId(register);
                return letterDto;
            }
        }catch(error){
            throw new Error(error.message || error);
        }
        
    }
    async generateReportByMonthAndYear(month: number, year: number) {
        try{
           // Crear las fechas de inicio y fin del mes dado
            const startDate = new Date(year, month - 1, 1); // Primer día del mes
            const endDate = new Date(year, month, 0, 23, 59, 59, 999); // Último día del mes
            // Buscar registros entre las fechas dadas
            const registers = await this.registerRepository.find({
                relations: [
                    'reporter',
                    'reported',
                ],
                where: {
                    deleteAt: null,
                    state: true,
                    createAt: Between(startDate, endDate),
                    reported: {deleteAt: IsNull(),},
                    reporter: {deleteAt: IsNull() }
                },
                order: { createAt: 'ASC' }
            });
                if (!registers) {
                    return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
                }else{
                    const generateReportByMonthAndYear = await this.registerService.generateReportByMonthAndYear(registers);
                    console.log("generateReportByMonthAndYear",generateReportByMonthAndYear)
                    return { status: true, message: ResponseMessages.RECORD_CREATED,data: generateReportByMonthAndYear };
                }
        }catch(error){
            return { status: false, message: error.message || error };
        }
    }
}
