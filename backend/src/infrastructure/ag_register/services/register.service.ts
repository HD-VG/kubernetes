/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { AsignationUserRol, Register, 
    ConfigurationTypeMachine, ConfigurationTypeDagme,
    ConfigurationTypeWork, ConfigurationUtil, Reported,
    Reporter, Water, Recurring, ConfigurationCars, ConfigurationTypeMaterial } from "src/domain/shared/index.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, IsNull } from 'typeorm';
import { differenceInMinutes, parse } from 'date-fns';

@Injectable()
export class RegisterService {
    constructor(
        @InjectRepository(ConfigurationTypeMachine)
        private readonly configurationTypeMachineRepository: Repository<ConfigurationTypeMachine>,
        @InjectRepository(ConfigurationTypeDagme)
        private readonly configurationTypeDagmeRepository: Repository<ConfigurationTypeDagme>,
        @InjectRepository(ConfigurationTypeWork)
        private readonly configurationTypeWorkRepository: Repository<ConfigurationTypeWork>,
        @InjectRepository(ConfigurationUtil)
        private readonly configurationUtilRepository: Repository<ConfigurationUtil>,
        @InjectRepository(Reported)
        private readonly reportedRepository: Repository<Reported>,
        @InjectRepository(Reporter)
        private readonly reporterRepository: Repository<Reporter>,
        @InjectRepository(Water)
        private readonly waterRepository: Repository<Water>,
        @InjectRepository(Recurring)
        private readonly recurringRepository: Repository<Recurring>,
        @InjectRepository(AsignationUserRol)
        private readonly asignationUserRolRepository: Repository<AsignationUserRol>,
        @InjectRepository(ConfigurationTypeMaterial)
        private readonly configurationTypeMaterialRepository: Repository<ConfigurationTypeMaterial>,
        @InjectRepository(ConfigurationCars)
        private readonly configurationCarsRepository: Repository<ConfigurationCars>,
    ) { }
    async resolveEntities<T>(
        source: any, // puede ser dto o register
        arrayKey: string,
        repository: Repository<T>,
        options?: {
            relations?: string[];          // para extractEntities
            idExtractor?: (item: any) => any; 
            mapper?: (entity: T) => any;   // para formatear
            overwrite?: boolean;           // true = reemplaza dto[arrayKey]
            withSoftDeleteCheck?: boolean; // true = agrega deleteAt: IsNull()
        }
    ): Promise<any[]> {
        const items = source[arrayKey] || [];
        if (items.length === 0) return [];

        const idExtractor = options?.idExtractor || ((item: any) => item.id);
        const ids = items.map(idExtractor);

        // Opciones de consulta
        let entities: T[] = [];
        if (options?.withSoftDeleteCheck) {
            const findOptions: any = { where: { id: In(ids), deleteAt: IsNull() } };
            if (options?.relations) findOptions.relations = options.relations;
            entities = await repository.find(findOptions);
        } else {
            entities = await repository.findBy({ id: In(ids) } as any);
        }

        // Sobrescribe el DTO si se indica
        if (options?.overwrite) {
            source[arrayKey] = entities;
        }

        return options?.mapper ? entities.map(options.mapper) : entities;
    }

    async ValidationTableRelationalsDagmes(dto) {
        return this.resolveEntities(dto, 'configurationTypeDagmes', this.configurationTypeDagmeRepository, { overwrite: true });
    }

    async ValidationTableRelationalsWorks(dto) {
        return this.resolveEntities(dto, 'configurationTypeWorks', this.configurationTypeWorkRepository, { overwrite: true });
    }

    async ValidationTableRelationalsUtils(dto) {
        return this.resolveEntities(dto, 'configurationUtil', this.configurationUtilRepository, { overwrite: true });
    }

    async ValidationTableRelationalsMachines(dto) {
        return this.resolveEntities(dto, 'configurationTypeMachines', this.configurationTypeMachineRepository, { overwrite: true });
    }

    async ValidationTableRelationalsAsignationUserRol(dto) {
        const entities = await this.resolveEntities(dto, 'workerAssigment', this.asignationUserRolRepository, { overwrite: true });
        dto.assignment_user = entities;
        return entities;
    }


    async ValidationReported(dto) {
        return this.reportedRepository.findOneBy({ id: dto.reporter });
    }

    async ValidationReporter(dto) {
        return this.reporterRepository.findOneBy({ id: dto.reported });
    }

    async groupValidation(dto){
        const validatedDtoMachine = await this.ValidationTableRelationalsMachines(dto);
        const validatedDtoWorks = await this.ValidationTableRelationalsWorks(dto);
        const validatedDtoUtils = await this.ValidationTableRelationalsUtils(dto);
        const validatedDtoDagmes = await this.ValidationTableRelationalsDagmes(dto);
        const validatedDtoWorker = await this.ValidationTableRelationalsAsignationUserRol(dto);
        const reported = await this.ValidationReported(dto);
        const reporter = await this.ValidationReporter(dto);
        const validations = {
            machine: validatedDtoMachine,
            works: validatedDtoWorks,
            utils: validatedDtoUtils,
            dagmes: validatedDtoDagmes,
            worker: validatedDtoWorker,
            reported,
            reporter
        };
        return validations;
    }

    async getWater() {
        return this.waterRepository.findOne({ where: { deleteAt: IsNull() }, order: { createAt: 'DESC' } });
    }

    async getRecurring() {
        return this.recurringRepository.find({ where: { deleteAt: IsNull() } });
    }

    async extractUtilsIds(register: Register) {
        return this.resolveEntities(register, 'configurationUtil', this.configurationUtilRepository, { withSoftDeleteCheck: true });
    }

    async extractDagmeIds(register: Register) {
        return this.resolveEntities(register, 'configurationTypeDagmes', this.configurationTypeDagmeRepository, { withSoftDeleteCheck: true });
    }

    async extractWorkIds(register: Register) {
        return this.resolveEntities(register, 'configurationTypeWorks', this.configurationTypeWorkRepository, { withSoftDeleteCheck: true });
    }

    async extracMaterials(id: number) {
        return this.configurationTypeMaterialRepository.find({ where: { register: { id }, deleteAt: IsNull() } });
    }

    async extracCars(id: number) {
        return this.configurationCarsRepository.find({ where: { register: { id }, deleteAt: IsNull() } });
    }

    async extractAssignmentUserIds(register: Register) {
        return this.resolveEntities(register, 'assignment_user', this.asignationUserRolRepository, {
            relations: ['user', 'rol'],
            idExtractor: (user) => user.id,
            withSoftDeleteCheck: true,
            mapper: (assignment: AsignationUserRol) => ({
                id: assignment.id,
                userName: assignment.user.name,
                rolName: assignment.rol.name,
                rolCost: ((assignment.rol.monthlyBasic / 30) / 8)
            })
        });
    }

    async extractMachineIds(register: Register) {
        return this.resolveEntities(register, 'configurationTypeMachines', this.configurationTypeMachineRepository, { withSoftDeleteCheck: true });
    }
    getMonthNameInSpanish(month: number): string {
        const months = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        return months[month - 1];
    }

    convertirATotalMinutos(hora: string): number {
        const [horas, minutos] = (hora || '00:00').split(':').map(Number);
        return (horas || 0) * 60 + (minutos || 0);
    }

    calcularTimeCars(time: string): number {
        const [hours, minutes] = (time || '00:00').split(':').map(Number);
        return (hours || 0) + ((minutes || 0) / 60);
    }
    async getSnapshot(register: Register) {
            const baseData = await this.getBaseRegisterData(register);
            return {
                id: register.id,
                reason: register.reason,
                addressDagme: register.addressDagme,
                dateDagme: register.dateDagme,
                timeStart: register.timeStart,
                timeWater: register.timeWater,
                perforation: register.perforation,
                code: register.code,
                cite: register.cite,
                ...baseData,
                coste_water: await this.getWater(),
                coste_recurring: await this.getRecurring(),
            };

    }
    async printResumen(register: Register, result: Register[]) {
        const water = await this.getWater();
        const recurring = await this.getRecurring();

        const formattedData = await Promise.all(result.map(async (reg) => {
            const workTimeInMinutes = this.calculate_time(reg.timeInit, reg.timeEnd);
            const waterTimeInMinutes = this.convertirATotalMinutos(reg.timeWater);
            const costs = await this.calculateCosts(reg, water, recurring, workTimeInMinutes, waterTimeInMinutes);

            return {
                id: reg?.id,
                reported_name: reg?.reported?.name ?? null,
                reported_lastname: reg?.reported?.lastname ?? null,
                reported_ci: reg?.reported?.ci ?? null,
                reported_phone: reg?.reported?.phone ?? null,
                address: reg?.addressDagme ?? null,
                date: reg?.dateDagme ?? null,
                reason: reg?.reason ?? null,
                machineCost: costs.machineCost,
                utilCost: costs.utilCost,
                materialCost: costs.materialCost,
                carCost: costs.carCost,
                assignmentUserCost: costs.assignmentUserCost,
                costeWater: costs.waterCost,
                registerTotalCost: costs.totalCost,
                coste_reccurring: costs.recurringCost,
            };
        }));

        const totalCost = formattedData.reduce((sum, item) => sum + (item.registerTotalCost || 0), 0);

        return { formattedData, totalCost };
    }
    calculate_time(timeInit: string, timeEnd: string): number {
        const timeInitService = parse(timeInit || '00:00', 'HH:mm', new Date());
        const timeEndService = parse(timeEnd || '00:00', 'HH:mm', new Date());
        let durationMinutes = differenceInMinutes(timeEndService, timeInitService);
        return Math.abs(durationMinutes);
    }

    roundToNearest(monto: number): number {
        const redondeoCajero = 0.10;
        if (isNaN(monto)) return 0;
        let montoRedondeado = Math.floor(monto / redondeoCajero) * redondeoCajero;
        const diferencia = monto - montoRedondeado;
        if (diferencia > 0.05) montoRedondeado += redondeoCajero;
        return parseFloat(montoRedondeado.toFixed(2));
    }

    async calculateCosts(
        register: Register,
        water: Water,
        recurring: Recurring[],
        workTimeInMinutes: number,
        waterTimeInMinutes: number
    ): Promise<{
        machineCost: number;
        utilCost: number;
        materialCost: number;
        carCost: number;
        assignmentUserCost: number;
        recurringCost: number;
        waterCost: number;
        totalCost: number;
    }> {
        const machines = await this.extractMachineIds(register);
        const utils = await this.extractUtilsIds(register);
        const materials = await this.extracMaterials(register.id);
        const cars = await this.extracCars(register.id);
        const assignmentUsers = await this.extractAssignmentUserIds(register);

        const workTimeInHours = workTimeInMinutes / 60;

        const machineCost = this.roundToNearest(machines.reduce((acc, m) => acc + (Number(m.basicCosteHour) * workTimeInHours), 0));
        const utilCost = this.roundToNearest(utils.reduce((acc, u) => acc + (Number(u.basicCosteHour) * workTimeInHours), 0));
        const materialCost = this.roundToNearest(materials.reduce((acc, m) => acc + Number(m.totalCost), 0));
        const carCost = this.roundToNearest(cars.reduce((acc, car) => acc + (Number(car.basicCoste) * this.calcularTimeCars(car.time)), 0));
        const assignmentUserCost = this.roundToNearest(assignmentUsers.reduce((acc, u) => acc + (Number(u.rolCost) * workTimeInHours), 0));
        const recurringCost = this.roundToNearest(recurring.reduce((acc, r) => acc + Number(r.basicCoste), 0));

        const dato = Number(register.drillHole) / 1000;
        const radio = dato / 2;
        const area = Math.PI * Math.pow(radio, 2);
        const g = 9.8;
        const cd = Number(water.height);
        const caudal = cd * area * Math.sqrt(2 * g * Number(water.cohefficientDischarge));
        const caudalHoras = caudal * 3600;
        const volumen = caudalHoras * (waterTimeInMinutes / 60);
        const waterCost = this.roundToNearest(volumen * Number(water.basicCoste));

        const totalCost = machineCost + utilCost + materialCost + carCost + assignmentUserCost + recurringCost + waterCost;

        return { machineCost, utilCost, materialCost, carCost, assignmentUserCost, recurringCost, waterCost, totalCost };
    }

    async getBaseRegisterData(register: Register) {
        return {
            id: register.id,
            reason: register.reason,
            addressDagme: register.addressDagme,
            dateDagme: register.dateDagme,
            timeStart: register.timeStart,
            timeWater: register.timeWater,
            perforation: register.perforation,
            code: register.code,
            cite: register.cite,
            codeReporter: register.reporter.codeReporter,
            timeInit: register.timeInit,
            timeEnd: register.timeEnd,
            transcurred: this.convertirATotalMinutos(register.timeWater),
            transcurred_worker: this.calculate_time(register.timeInit, register.timeEnd),
            drillHole: register.drillHole,
            createAt: register.createAt,
            reporter_name: register.reporter.name,
            reporter_lastname: register.reporter.lastname,
            reporter_ci: register.reporter.ci,
            reporter_phone: register.reporter.phone,
            reporter_adrress: register.reporter.address, 
            reported_name: register.reported.name,
            reported_lastname: register.reported.lastname,
            reported_ci: register.reported.ci,
            reported_phone: register.reported.phone,
            reported_address: register.reported.address,
            machine_ids: await this.extractMachineIds(register),
            dagme_ids: await this.extractDagmeIds(register),
            work_ids: await this.extractWorkIds(register),
            util_ids: await this.extractUtilsIds(register),
            assignment_userIds: await this.extractAssignmentUserIds(register),
            configurationTypeMaterials_ids: await this.extracMaterials(register.id),
            configurationCars_ids: await this.extracCars(register.id),
            coste_water: await this.getWater(),
            coste_recurring: await this.getRecurring(),
        };
    }

    async printRegister(register: Register, water: Water, recurring: Recurring[], result: Register[]) {
            if (result && result.length > 0) {
                const formattedData = await Promise.all(result.map(async (reg) => {
                    const workTimeInMinutes = this.calculate_time(reg.timeInit, reg.timeEnd);
                    const waterTimeInMinutes = this.convertirATotalMinutos(reg.timeWater);
                    const costs = await this.calculateCosts(reg, water, recurring, workTimeInMinutes, waterTimeInMinutes);

                    const dato = Number(reg.drillHole) / 1000;
                    const radio = dato / 2;
                    const area = Math.PI * Math.pow(radio, 2);
                    const g = 9.8;
                    const cd = Number(water.height);
                    const caudal = cd * area * Math.sqrt(2 * g * Number(water.cohefficientDischarge));
                    const caudalHoras = caudal * 3600;
                    const volumen = caudalHoras * (waterTimeInMinutes / 60);

                    const baseData = await this.getBaseRegisterData(reg);
                    return {
                        id: reg.id,
                        reason: reg.reason,
                        addressDagme: reg.addressDagme,
                        dateDagme: reg.dateDagme,
                        timeStart: reg.timeStart,
                        perforation: reg.perforation,
                        code: reg.code,
                        ...baseData,
                        coste_water: costs.waterCost,
                        coste_workers: costs.assignmentUserCost,
                        coste_car: costs.carCost,
                        coste_material: costs.materialCost,
                        coste_util: costs.utilCost,
                        coste_machine: costs.machineCost,
                        coste_recurring: costs.recurringCost,
                        area: area.toExponential(4),
                        caudalHoras: caudalHoras.toExponential(4),
                        volumen: volumen.toExponential(4),
                        costeWater: costs.waterCost.toExponential(4),
                        coste_total: costs.totalCost
                    };
                }));

                return {
                    status: true,
                    message: "Datos encontrados",
                    data: formattedData
                };
            } else {
                return {
                    status: true,
                    message: "Datos no encontrados"
                };
            }
    }

    async sumAmountsByMonth(registers: Register[]) {
        const amountsByMonth: { month: string; year: number; total: number }[] = [];
        const monthlyTotals: Record<string, number> = {};
        const water = await this.getWater();
        const recurring = await this.getRecurring();

        for (const register of registers) {
            const date = new Date(register.createAt);
            const month = this.getMonthNameInSpanish(date.getMonth() + 1);
            const year = date.getFullYear();
            const monthKey = `${month} ${year}`;
            monthlyTotals[monthKey] ||= 0;

            const workTimeInMinutes = this.calculate_time(register.timeInit, register.timeEnd);
            const waterTimeInMinutes = this.convertirATotalMinutos(register.timeWater);
            const costs = await this.calculateCosts(register, water, recurring, workTimeInMinutes, waterTimeInMinutes);

            monthlyTotals[monthKey] += costs.totalCost;
        }

        for (const [monthKey, total] of Object.entries(monthlyTotals)) {
            const [month, yearStr] = monthKey.split(' ');
            amountsByMonth.push({ month, year: parseInt(yearStr, 10), total });
        }

        return amountsByMonth;
    }

    async sumAmountByRegisterId(register: Register) {
        const snapshot = register.snapshot;
        if (!snapshot || typeof snapshot !== "object") {
            return null;
        }

        const water = await this.getWater();
        const recurring = await this.getRecurring();
        const workTimeInMinutes = this.calculate_time(register.timeInit, register.timeEnd);
        const waterTimeInMinutes = this.convertirATotalMinutos(register.timeWater);
        const costs = await this.calculateCosts(register, water, recurring, workTimeInMinutes, waterTimeInMinutes);

        const dagme_name = (snapshot.dagme_ids || []).map(d => d.name).join(", ");

        return {
            registerId: snapshot.id,
            reporterName: snapshot.reporter_name,
            reporterLastname: snapshot.reporter_lastname,
            reportedName: snapshot.reported_name,
            reportedLastname: snapshot.reported_lastname,
            date: snapshot.dateDagme,
            time: snapshot.timeStart,
            code: snapshot.code,
            cite: snapshot.cite,
            codeReporter: snapshot.codeReporter,
            perforation: snapshot.perforation,
            drillHole: snapshot.drillHole,
            direction: snapshot.addressDagme,
            reason: snapshot.reason,
            dagmes_name: dagme_name,
            carCoste: costs.carCost,
            costerMaterials: costs.materialCost,
            workersCoste: costs.assignmentUserCost,
            utilsCoste: costs.utilCost,
            machineCoste: costs.machineCost,
            recurringCoste: costs.recurringCost,
            waterCoste: costs.waterCost,
            totalDamageCost: costs.totalCost,
        };
    }

    async generateReportByMonthAndYear(registers: Register[]) {
        const water = await this.getWater();
        const recurring = await this.getRecurring();
        const reportData = [];

        for (const register of registers) {
            const workTimeInMinutes = this.calculate_time(register.timeInit, register.timeEnd);
            const waterTimeInMinutes = this.convertirATotalMinutos(register.timeWater);
            const costs = await this.calculateCosts(register, water, recurring, workTimeInMinutes, waterTimeInMinutes);

            reportData.push({
                addressDagme: register.addressDagme,
                reason: register.reason,
                reported: register.reported
                    ? `${register.reported.name || ""} ${register.reported.lastname || ""}`.trim()
                    : "",
                totalCost: costs.totalCost,
                createdAt: register.createAt,
                code: register.code,
                cite: register.cite,
            });
        }

        return reportData;
    }
}