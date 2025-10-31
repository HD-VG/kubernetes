/* eslint-disable prettier/prettier */
import { BaseEntity } from 'src/common/domain/base-url/entity';
import { formatDate } from 'src/common/utils/date.utils';
import {
    Column,
    Entity,
} from 'typeorm';

@Entity('cc_configuration_calculation')
export class ConfigurationCalculation extends BaseEntity{

    @Column({ type: 'text', nullable: true })
    formula: string; // Fórmula en texto plano

    @Column({ nullable: true })
    instrumentUsed: string; // Herramienta utilizada

    @Column({ nullable: true })
    approvedByApps: boolean;

    @Column()
    statusConfiguration: boolean;

    constructor(data?: Partial<ConfigurationCalculation>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(
        dto: {
            formula: string,
            instrumentUsed: string,
        },
        userId: number,
    ): ConfigurationCalculation {
        const entity = new ConfigurationCalculation();
        entity.formula = dto.formula;
        entity.instrumentUsed = dto.instrumentUsed.toUpperCase();
        entity.approvedByApps = true;
        entity.statusConfiguration = true;
        entity.createUserId = userId;
        entity.createAt = new Date();
        return entity;
    }

    update(
        dto: Partial<{
            formula: string;
            instrumentUsed: string;
            approvedByApps: boolean;
            statusConfiguration: boolean;
        }>,
        userId: number,
    ) {
        if (dto.formula)
            this.formula = dto.formula;
        if (dto.instrumentUsed)
            this.instrumentUsed = dto.instrumentUsed.toUpperCase();
        this.approvedByApps = dto.approvedByApps;
        this.statusConfiguration = dto.statusConfiguration;
        this.updateUserId = userId;
        this.updateAt = new Date();
    }

    softDelete(userId: number) {
        if (this.deleteAt) {
            throw new Error('Este registro ya fue eliminado');
        }

        this.deleteAt = new Date();
        this.deleteUserId = userId;
        this.approvedByApps = false;
        this.statusConfiguration = false;
    }

    desactive(userId: number) {
        this.updateUserId = userId;
        this.updateAt = new Date();
        this.statusConfiguration = false
    }

    active(userId: number) {
        this.updateUserId = userId;
        this.updateAt = new Date();
        this.statusConfiguration = true
    }

    desactiveApps(userId: number) {
        this.updateUserId = userId;
        this.updateAt = new Date();
        this.approvedByApps = false
    }

    activeApps(userId: number) {
        this.updateUserId = userId;
        this.updateAt = new Date();
        this.approvedByApps = true
    }

    get isActive(): boolean {
        return this.statusConfiguration;
    }


    toResponse() {
        return {
            id: this.id,
            formula: this.formula,
            instrumentUsed: this.instrumentUsed,
            approvedByApps: this.approvedByApps,
            statusConfiguration: this.statusConfiguration,
            createAt: formatDate(this.createAt.toString()),
        }
    }

}
