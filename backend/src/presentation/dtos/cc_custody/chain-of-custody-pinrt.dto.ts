/* eslint-disable prettier/prettier */
import { Sampling } from "src/domain/cc_sampling/entities/sampling.entity";
import { ChainOfCustody } from "../../../domain/cc_custody/entities/chain_of_custody.entity";
import { Transport } from "src/domain/cc_transport/entities/transport.entity";
import { Applicant } from "src/domain/cc_applicant/entities/applicant.entity";

export class CustodyPrintDTO {
    static fromEntity(
        custody: ChainOfCustody,
        sampling?: Sampling,
        transport?: Transport,
        applicant?: Applicant,
    ) {
        return {
            id: custody.id,
            codeCustody: custody.codeCustody,
            laboratoryMB: custody.laboratoryMB,
            laboratoryFQ: custody.laboratoryFQ,
            codeThermohygrometer: custody.codeThermohygrometer,
            codeThermometerMM: custody.codeThermometerMM,
            codeThermometer: custody.codeThermometer,
            codeColorimeter: custody.codeColorimeter,
            initialConservative: custody.initialConservative,
            createUserId: custody.createUserId,
            updateUserId: custody.updateUserId,
            deleteUserId: custody.deleteUserId,
            createAt: custody.createAt,
            updateAt: custody.updateAt,
            deleteAt: custody.deleteAt,
            sampling: sampling ? {
                sampleCode: sampling.sampleCode,
                description: sampling.description,
                sourceOfSupply: sampling.sourceOfSupply,
                quantity: sampling.quantity,
                sampleLocation: sampling.sampleLocation,
                samplePoint: sampling.samplePoint,
                coordinatesX: sampling.coordinatesX,
                coordinatesY: sampling.coordinatesY,
                samplingTechnique: sampling.samplingTechnique,
                samplingTechniqueM: sampling.samplingTechniqueM,
                ciResA: sampling.ciResA,
                ciResB: sampling.ciResB,
                condAmbT: sampling.condAmbT,
                condAmbB: sampling.condAmbB,
                samplingDay: sampling.samplingDay,
                samplingTime: sampling.samplingTime,
                createUserId: sampling.createUserId,
                updateUserId: sampling.updateUserId,
                deleteUserId: sampling.deleteUserId,
                createAt: sampling.createAt,
                updateAt: sampling.updateAt,
                deleteAt: sampling.deleteAt,
            } : null,
            transport: transport
                ? {
                    responsable: transport.responsable,
                    userId: transport.userId,
                    distanceTraveled: transport.distanceTraveled,
                    conservativeArrivalStretch: transport.conservativeArrivalStretch,
                    maximumStretch: transport.maximumStretch,
                    initDate: transport.initDate,
                    endDate: transport.endDate,
                    initTime: transport.initTime,
                    endTime: transport.endTime,
                    createUserId: transport.createUserId,
                    updateUserId: transport.updateUserId,
                    deleteUserId: transport.deleteUserId,
                    createAt: transport.createAt,
                    updateAt: transport.updateAt,
                    deleteAt: transport.deleteAt,
                }
                : null,
            applicant: applicant
                ? {
                    entityName: applicant.entityName,
                    location: applicant.location,
                    referencePerson: applicant.referencePerson,
                    phone: applicant.phone,
                    createUserId: applicant.createUserId,
                    updateUserId: applicant.updateUserId,
                    deleteUserId: applicant.deleteUserId,
                    createAt: applicant.createAt,
                    updateAt: applicant.updateAt,
                    deleteAt: applicant.deleteAt,
                }
                : null,
        };
    }
}
