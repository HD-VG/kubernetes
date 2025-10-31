/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
} from 'typeorm';
import { CreateRecurringDto, UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { formatDate } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('ag_recurring')
export class Recurring extends BaseEntity{

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 12, scale: 8 })
    basicCoste: number;

    constructor(data?:Partial<Recurring>){
        super();
    if(data) Object.assign(this, data);
    }
    static create(dto:CreateRecurringDto, userId: number ):Recurring{
    const entities = new Recurring();
    entities.name = dto.name.toUpperCase();
    entities.basicCoste = dto.basicCoste;
    entities.createUserId = userId;
    entities.createAt = new Date();
    return entities;
    }
    update(dto: UpdateRecurringDto, userId:number){
    if(dto.name !== null && dto.name !== undefined ){
        this.name = dto.name.toUpperCase();
    }
    this.basicCoste = dto.basicCoste ?? this.basicCoste;
    this.updateUserId = userId;
    this.updateAt = new Date();
    return this;
    }
    delete(userId : number){
    this.deleteUserId= userId;
    this.deleteAt = new Date();
    return this;
    }
    getResponse(){
    return  {
        id: this.id,
        uuid: this.uuid,
        name: this.name.toUpperCase(),
        basicCoste: this.basicCoste,
        createUserId: this.createUserId,
        createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
        updateUserId: this.updateUserId,
        updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
        deleteUserId: this.deleteUserId,
        deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
    }
    }
}
