/* eslint-disable prettier/prettier */
import { BaseEntity } from "src/common/domain/base-url/entity";
import { formatDate } from "src/common/utils/date.utils";
import { Register } from "src/domain/ag_register/entities/register.entity";
import { CreateRegisterPictureDto } from "src/presentation/dtos/ag_register_picture/create-register_picture.dto";
import {
    Column,
    Entity,
    ManyToOne,
    JoinColumn,
} from "typeorm";

@Entity('ag_register_picture')
export class RegisterPicture extends BaseEntity{

    @Column()
    pictureUrl: string;

    @ManyToOne(() => Register, register => register.registerPictures, { nullable: false })
    @JoinColumn({ name: 'register_id' })
    register: Register;

    constructor(data?: Partial<RegisterPicture>) {
        super();
        if (data) Object.assign(this, data);
    }
    static create(dto: CreateRegisterPictureDto, register ,userId: number): RegisterPicture {
        const entities = new RegisterPicture();
        entities.pictureUrl = dto.pictureUrl;
        entities.register = register;
        entities.createUserId = userId;
        entities.createAt = new Date()
        return entities;
    }

    delete(user: number) {
        this.deleteUserId = user;
        this.deleteAt = new Date();
        return this
    }

    getResponse() {
        return {
            id: this.id,
            pictureUrl: this.pictureUrl,
            register: this.register ? {
                reason: this.register.reason,
                addressDagme: this.register.addressDagme,
                timeStart: this.register.timeStart,
                timeWater: this.register.timeWater,
                perforation: this.register.perforation,
                code: this.register.code,
                cite: this.register.cite,
                timeInit: this.register.timeInit,
                timeEnd: this.register.timeEnd,
                drillHole: this.register.drillHole,
            } : null,
            createUserId: this.createUserId,
            createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
            updateUserId: this.updateUserId,
            updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
            deleteUserId: this.deleteUserId,
            deleteAt: this.deleteAt ? formatDate(this.deleteAt.toString()) : null,
        }
    }
}
