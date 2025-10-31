/* eslint-disable prettier/prettier */
import { formatDate } from "src/common/utils/date.utils";
import { ChainOfCustody } from "../../../domain/cc_custody/entities/chain_of_custody.entity";

export class ChainOfCustodyDTO {
    constructor(entity: ChainOfCustody) {
        this.id = entity.id;
        this.codeCustody = entity.codeCustody;
        this.laboratoryMB = entity.laboratoryMB;
        this.laboratoryFQ = entity.laboratoryFQ;
        this.codeThermohygrometer = entity.codeThermohygrometer;
        this.codeThermometerMM = entity.codeThermometerMM;
        this.codeThermometer = entity.codeThermometer;
        this.codeColorimeter = entity.codeColorimeter;
        this.initialConservative = entity.initialConservative;
        this.createAt = formatDate(entity.createAt.toString());
    }

    id: number;
    codeCustody: string;
    laboratoryMB: boolean;
    laboratoryFQ: boolean;
    codeThermohygrometer: string;
    codeThermometerMM: string;
    codeThermometer: string;
    codeColorimeter: string;
    initialConservative: string;
    createAt: string;
}
