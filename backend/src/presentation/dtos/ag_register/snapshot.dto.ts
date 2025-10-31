/* eslint-disable prettier/prettier */
export class MachineDTO {
    id: number;
    name: string;
    basicCoste: number;
    basicCosteYear: number;
    basicCosteHour: number;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class CarDTO {
    id: number;
    idVehiculo: string;
    licensePlate: string;
    make: string;
    model: string;
    basicCoste: number;
    estado: number;
    time: string;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class MaterialDTO {
    id: number;
    code: string;
    parent: string;
    level: number;
    branches: number;  
    name: string;
    unit: string;
    valMinimun: number;
    valMaximun: number;
    priceUs: number;
    priceBs: number;
    typeItem: string;
    iStock: string;
    quantityD: number;
    quantityH: number;
    balandeAmount: number;
    debitBs: number;
    creditBs: number;
    balanceCost: number
    unitRequested: string;
    quantity: number;
    totalCost: number;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class UserAssignmentDTO {
    id: number;
    userName: string;
    rolName: string;
    rolCost: number;
}

export class UtilsDTO {
    id: number;
    name: string;
    basicCosteHour: number;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class DagmeDTO {
    id: number;
    name: string;
    status: boolean;
    createUserId: number;
    updateUserId: number;
    deleteUserId : number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class WorkDTO {
    id: number;
    name: string;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt: Date;
    updateAt: Date;
    deleteAt: Date | null;
}

export class WaterDTO {
    id: number;
    name: string;
    basicCoste: number;
    height: number;
    cohefficientDischarge: number;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date | null;
}

export class RecurringDTO {
    id: number;
    name: string;
    basicCoste: number;
    createUserId: number;
    updateUserId: number;
    deleteUserId: number;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: Date | null;
}

export class SnapshotDTO {
    id: number;
    reason: string;
    addressDagme: string;
    dateDagme: Date;
    timeStart: string;
    timeWater: string;
    perforation: string;
    code: string;
    cite: number;
    codeReporter: string;
    timeInit: string;
    timeEnd: string;
    transcurred: number;
    transcurred_worker: number;
    drillHole: number;
    createAt: Date;
    reporter_name: string;
    reporter_lastname: string;
    reporter_ci: string;
    reporter_phone: string;
    reporter_adrress: string;
    reported_name: string;
    reported_lastname: string;
    reported_ci: string;
    reported_phone: string;
    reported_address: string;
    machine_ids?: MachineDTO[];
    dagme_ids?: DagmeDTO[];
    work_ids?: WorkDTO[];
    util_ids?: UtilsDTO[];
    assignment_userIds?: UserAssignmentDTO[];
    configurationTypeMaterials_ids?: MaterialDTO[];
    configurationCars_ids?: CarDTO[];
    coste_water?: WaterDTO;
    coste_recurring?: RecurringDTO[];
}