/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity'
import { formatDate } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('cc_applicant')
export class Applicant extends BaseEntity{

    @Column()
    entityName: string;

    @Column()
    location: string;

    @Column()
    referencePerson: string;

    @Column()
    phone: string;

    @OneToOne(() => ChainOfCustody)
    @JoinColumn({ name: 'custody_id' })
    chainOfCustody: ChainOfCustody;

    constructor(data?: Partial<Applicant>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(
        dto: {
            entityName: string,
            location: string,
            referencePerson: string,
            phone: string,
        },
        chainOfCustody: ChainOfCustody,
        userId: number,
    ): Applicant {
        const entity = new Applicant();
        entity.entityName = dto.entityName;
        entity.location = dto.location.toUpperCase();
        entity.referencePerson = dto.referencePerson.toUpperCase();
        entity.phone = dto.phone;
        entity.createUserId = userId;
        entity.chainOfCustody = chainOfCustody;
        entity.createAt = new Date();
        return entity;
    }

    update(
        dto: Partial<{
            entityName: string;
            location: string;
            referencePerson: string;
            phone: string;
        }>,
        userId: number,
    ) {
        if (dto.entityName)
            this.entityName = dto.entityName.toUpperCase();
        if (dto.location)
            this.location = dto.location.toUpperCase();
        if (dto.referencePerson)
            this.referencePerson = dto.referencePerson;
        if (dto.phone)
            this.phone = dto.phone;
        this.updateUserId = userId;
        this.updateAt = new Date();
    }

    softDelete(userId: number) {
        if (this.deleteAt) {
            throw new Error('Este registro ya fue eliminado');
        }

        this.deleteAt = new Date();
        this.deleteUserId = userId;
    }

    toResponse() {
        return {
            id: this.id,
            entityName: this.entityName,
            location: this.location,
            referencePerson: this.referencePerson,
            phone: this.phone,
            createAt: formatDate(this.createAt.toString()),
        }
    }

}
