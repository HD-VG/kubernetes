/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
} from 'typeorm';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity'
import { CreateTransportDto, UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto'
import { formatDate, formatDateWithoutTime, formatTime } from 'src/common/utils/date.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('cc_transport')
export class Transport extends BaseEntity{

    @Column()
    responsable: string;

    @Column()
    userId: number;

    @Column()
    distanceTraveled: string;

    @Column()
    conservativeArrivalStretch: string;

    @Column()
    maximumStretch: string;

    @Column()
    initDate: Date;

    @Column()
    endDate: Date

    @Column()
    initTime: string

    @Column()
    endTime: string

    @OneToOne(() => ChainOfCustody)
    @JoinColumn({ name: 'custody_id' })
    chainOfCustody: ChainOfCustody;

    constructor(data?: Partial<Transport>) {
      super();
        if (data) Object.assign(this, data);
    }

    static create(
    dto: CreateTransportDto,
    userId: number,
    chainOfCustody: ChainOfCustody,
  ): Transport {
    return new Transport({
      responsable: dto.responsable.toUpperCase(),
      userId: userId,
      createUserId: userId,
      distanceTraveled: dto.distanceTraveled.toUpperCase(),
      conservativeArrivalStretch: dto.conservativeArrivalStretch.toUpperCase(),
      maximumStretch: dto.maximumStretch.toUpperCase(),
      initDate: dto.initDate,
      endDate: dto.endDate,
      initTime: dto.initTime,
      endTime: dto.endTime,
      createAt: new Date(),
      chainOfCustody: chainOfCustody,
    });
  }

  update(dto: UpdateTransportDto, userId: number): void {
    if (dto.responsable !== undefined) {
      this.responsable = dto.responsable.toUpperCase();
    }
    if (dto.distanceTraveled !== undefined) {
      this.distanceTraveled = dto.distanceTraveled.toUpperCase();
    }
    if (dto.conservativeArrivalStretch !== undefined) {
      this.conservativeArrivalStretch = dto.conservativeArrivalStretch.toUpperCase();
    }
    if (dto.maximumStretch !== undefined) {
      this.maximumStretch = dto.maximumStretch.toUpperCase();
    }
    if (dto.initDate !== undefined) {
      this.initDate = dto.initDate;
    }
    if (dto.endDate !== undefined) {
      this.endDate = dto.endDate;
    }
    if (dto.initTime !== undefined) {
      this.initTime = dto.initTime;
    }
    if (dto.endTime !== undefined) {
      this.endTime = dto.endTime;
    }

    this.updateUserId = userId;
    this.updateAt = new Date();
  }

  softDelete(userId: number): void {
    this.deleteUserId = userId;
    this.deleteAt = new Date();
  }

  toResponse() {
    return {
      id: this.id,
      responsable: this.responsable,
      distanceTraveled: this.distanceTraveled,
      conservativeArrivalStretch: this.conservativeArrivalStretch,
      maximumStretch: this.maximumStretch,
      initDate: formatDateWithoutTime(this.initDate.toString()),
      endDate: formatDateWithoutTime(this.endDate.toString()),
      initTime: formatTime(this.initTime.toString()),
      endTime: formatTime(this.endTime.toString()),
      createAt: formatDate(this.createAt.toString()),
      updateAt: formatDate(this.updateAt.toString()),
    };
  }

}