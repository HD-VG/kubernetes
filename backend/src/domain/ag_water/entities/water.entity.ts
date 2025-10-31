/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';
import { CreateWaterDto, UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity'; 

@Entity('ag_water')
export class Water extends BaseEntity {
    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 12, scale: 8 })
    basicCoste: number;

    @Column({ nullable: true })
    height: number;

    @Column({ type: 'decimal', precision: 6, scale: 2, nullable: true })
    cohefficientDischarge: number;

    constructor(data?: Partial<Water>) {
        super(); 
        if (data) Object.assign(this, data);
    }

    static create(dto: CreateWaterDto, userId: number): Water {
        const entity = new Water();
        entity.name = dto.name.toUpperCase();
        entity.basicCoste = dto.basicCoste;
        entity.height = dto.height;
        entity.cohefficientDischarge = dto.cohefficientDischarge;
        entity.createUserId = userId;
        entity.createAt = new Date();
        return entity;
    }

    update(dto: UpdateWaterDto, userId: number) {
        if (dto.name != null) this.name = dto.name.toUpperCase();
        if (dto.basicCoste != null) this.basicCoste = dto.basicCoste;
        if (dto.height != null) this.height = dto.height;
        if (dto.cohefficientDischarge != null) this.cohefficientDischarge = dto.cohefficientDischarge;

        this.updateUserId = userId;
        this.updateAt = new Date();
        return this;
    }

    delete(userId: number) {
        this.deleteUserId = userId;
        this.deleteAt = new Date();
        return this;
    }

    getResponse() {
        return {
            id: this.id,
            uuid: this.uuid, 
            name: this.name,
            basicCoste: this.basicCoste,
            height: this.height,
            cohefficientDischarge: this.cohefficientDischarge,
            createUserId: this.createUserId,
            createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
            updateUserId: this.updateUserId,
            updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
            deleteUserId: this.deleteUserId,
            deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
        };
    }
}
