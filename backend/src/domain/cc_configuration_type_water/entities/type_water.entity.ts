/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    OneToMany,
} from 'typeorm';
import { ConfigurationUexp } from '../../shared/index.entity';
import { 
    CreateTypeWaterDto,
    UpdateTypeWaterDto
} from 'src/presentation/dtos/cc_configuration_type_water/index.dto'
import { formatDate } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('cc_configuration_type_water')
export class ConfigurationTypeWater extends BaseEntity {

    @Column()
    name: string;

    @Column()
    definition: string;

    @Column()
    abbreviation: string;

    @OneToMany(() => ConfigurationUexp, (configurationUexp) => configurationUexp.ctwId, {
    eager: false,
    })
    configurationUexp: ConfigurationUexp[];

    constructor(data?: Partial<ConfigurationTypeWater>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(
        dto: CreateTypeWaterDto,
        userId: number
    ): ConfigurationTypeWater {
        const entity = new ConfigurationTypeWater();
        entity.name = dto.name.toUpperCase();
        entity.definition = dto.definition.toUpperCase();
        entity.abbreviation = dto.abbreviation.toUpperCase();
        entity.createUserId = userId;
        entity.createAt = new Date();
        return entity;
    }

    update(
        dto: UpdateTypeWaterDto,
        userId: number
    ) {
        this.name = dto.name.toUpperCase();
        this.definition = dto.definition.toUpperCase();
        this.abbreviation = dto.abbreviation.toUpperCase();
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

    toResponse() {
        return {
            id: this.id,
            name: this.name,
            abbreviation: this.abbreviation,
            definition: this.definition,
            createAt: formatDate(this.createAt.toString()),
        }
    }
}
