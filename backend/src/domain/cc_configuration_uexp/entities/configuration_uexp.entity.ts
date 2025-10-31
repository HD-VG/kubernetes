/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { ConfigurationTypeWater } from '../../shared/index.entity';
import { 
    CreateConfigurationUexpDto,
    UpdateConfigurationUexpDto
} from 'src/presentation/dtos/cc_configuration_uexp/index.dto'
import { formatDate } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('cc_configuration_uexp')
export class ConfigurationUexp extends BaseEntity {

    @Column({ type: 'decimal', nullable: true, default: null })
    minValue: number;

    @Column({ type: 'decimal', nullable: true, default: null })
    maxValue: number;

    @Column({ type: 'decimal', nullable: true, default: null })
    ld: number;

    @Column({ type: 'decimal', nullable: true, default: null })

    @Column({ type: 'text' })
    formula: string;

    @ManyToOne(() => ConfigurationTypeWater, (ctwId) => ctwId.configurationUexp)
    @JoinColumn({ name: 'configuration_type_water_id' })
    ctwId: ConfigurationTypeWater;

    constructor(data?: Partial<ConfigurationUexp>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(
        dto: CreateConfigurationUexpDto,
        userId: number
    ): ConfigurationUexp {
        const entity = new ConfigurationUexp();
        entity.minValue = dto.minValue;
        entity.maxValue = dto.maxValue;
        entity.ld = dto.ld;
        entity.createUserId = userId;
        entity.createAt = new Date();
        return entity;
    }

    update(
        dto: UpdateConfigurationUexpDto,
        userId: number
    ) {
        this.minValue = dto.minValue;
        this.maxValue = dto.maxValue;
        this.ld = dto.ld;
        this.updateUserId = userId;
        this.updateAt = new Date();
    }

    solfDelete(
        userId: number
    ) {
        if (this.deleteAt) {
            throw new Error('Este registro ya fue eliminado');
        }
        this.deleteUserId = userId;
        this.deleteAt = new Date();
    }

    toResponse(){
        return {
            id: this.id,
            minValue: this.minValue,
            maxValue: this.maxValue,
            ld: this.ld,
            createAt: formatDate(this.createAt.toString())
        }
    }
}
