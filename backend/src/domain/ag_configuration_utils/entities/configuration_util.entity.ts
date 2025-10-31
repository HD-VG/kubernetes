/* eslint-disable prettier/prettier */
import { CreateConfigurationUtilDto, UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import {
    Column,
    Entity,
    ManyToMany,
} from 'typeorm';
import { formatDate } from 'src/common/utils/date.utils';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { BaseEntity } from 'src/common/domain/base-url/entity';
@Entity('ag_configuration_utils')
export class ConfigurationUtil extends BaseEntity{

    @Column()
    name: string;

    @Column({ type: 'decimal', precision: 16, scale: 8 })
    basicCosteHour: number;

    @ManyToMany(() => Register, (register) => register.configurationUtil)
    registers: Register[];

    constructor (data?: Partial<ConfigurationUtil>){
        super();
        if(data) Object.assign(this,data);
    }
    static create(dto:CreateConfigurationUtilDto,userId: number){
        const entities = new ConfigurationUtil();
        entities.name = dto.name.toUpperCase();
        entities.basicCosteHour = dto.basicCosteHour;
        entities.createUserId = userId;
        entities.createAt = new Date();
        return entities;
    }
    update(dto: UpdateConfigurationUtilDto,userId: number){
        if(dto.name !== null && dto.name !== undefined ){
            this.name = dto.name.toUpperCase();
        }
        this.basicCosteHour = dto.basicCosteHour ?? this.basicCosteHour;
        this.updateUserId = userId;
        this.updateAt = new Date();
        return this;
    }
    delete(user : number){
        this.deleteUserId= user;
        this.deleteAt = new Date();
        return this;
    }
    getResponse(){
        return  {
            id: this.id,
            uuid: this.uuid,
            name: this.name.toUpperCase(),
            basicCosteHour: this.basicCosteHour,
            createUserId: this.createUserId,
            createAt: formatDate(this.createAt.toString()),
            updateUserId: this.updateUserId,
            updateAt: formatDate(this.updateAt.toString()),
            deleteUserId: this.deleteUserId,
            deleteAt: this.deleteAt,
        }
    }
}
