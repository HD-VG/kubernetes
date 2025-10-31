/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Technique } from '../enum/technique.enum'
import { 
    ChainOfCustody,
    TestResult
} from 'src/domain/shared/index.entity';
import { CreateSamplingDto, UpdateSamplingDto } from 'src/presentation/dtos/cc_sampling/index.dto';
import { formatDate, formatDateWithoutTime, formatTime } from 'src/common/utils/index.utils';
import { BaseEntity } from 'src/common/domain/base-url/entity';

@Entity('cc_sampling')
export class Sampling extends BaseEntity{

    @Column({ nullable: true })
    typeCode: string;

    @Column({ nullable: true })
    sampleCode: string;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    sourceOfSupply: string;

    @Column({ nullable: true })
    quantity: number

    @Column({ nullable: true })
    sampleLocation: string;

    @Column({ nullable: true })
    samplePoint: string;

    @Column({ nullable: true })
    coordinatesX: string;

    @Column({ nullable: true })
    coordinatesY: string;

    @Column({
        nullable: true,
        type: 'enum',
        enum: Technique,
        default: Technique.SIMPLE
    })
    samplingTechnique: Technique;

    @Column({ nullable: true })
    samplingTechniqueM: string;

    @Column({ nullable: true })
    statusPh: boolean;

    @Column({ nullable: true })
    statusClr: boolean;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 5,
        scale: 2
    })
    ciResA: number;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 5,
        scale: 2
    })
    ciResB: number;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 5,
        scale: 2
    })
    condAmbT: number;

    @Column({
        nullable: true,
        type: 'decimal',
        precision: 5,
        scale: 2
    })
    condAmbB: number;

    @Column({ nullable: true })
    samplingDay: Date;

    @Column({ nullable: true })
    samplingTime: string;

    @Column({
        type: 'jsonb',
        nullable: true,
        default: '[]'
    })
    samplingConditions: string[]; // REVISAR

    @Column({ nullable: true })
    samplingAceptation: string;


    @ManyToOne(() => ChainOfCustody, (chainOfCustody) => chainOfCustody.samplings)
    @JoinColumn({ name: 'custody_id' })
    chainOfCustody: ChainOfCustody;

    @OneToMany(() => TestResult, test => test.sampling, { cascade: true, nullable: true })
    testResults: TestResult[];

    constructor(data?: Partial<Sampling>) {
        super();
        if (data) Object.assign(this, data);
    }

    static create(dto: CreateSamplingDto, userId: number, sampleCode: string, chain: ChainOfCustody): Sampling {
        const sampling = new Sampling();

        sampling.typeCode = dto.sampleCode;
        sampling.sampleCode = sampleCode;
        sampling.description = dto.description;
        sampling.sourceOfSupply = dto.sourceOfSupply;
        sampling.quantity = dto.quantity;
        sampling.sampleLocation = dto.sampleLocation;
        sampling.samplePoint = dto.samplePoint;
        sampling.coordinatesX = dto.coordinatesX;
        sampling.coordinatesY = dto.coordinatesY;
        sampling.samplingTechnique = dto.samplingTechnique;
        sampling.samplingTechniqueM = dto.samplingTechniqueM;
        sampling.statusPh = dto.statusPh;
        sampling.statusClr = dto.statusClr;
        sampling.ciResA = dto.ciResA;
        sampling.ciResB = dto.ciResB;
        sampling.condAmbT = dto.condAmbT;
        sampling.condAmbB = dto.condAmbB;
        sampling.samplingDay = dto.samplingDay;
        sampling.samplingTime = dto.samplingTime;
        sampling.createUserId = userId;
        sampling.createAt = new Date();
        sampling.chainOfCustody = chain;

        return sampling;
    }

    edit(dto: UpdateSamplingDto, userId: number) {
        this.description = dto.description;
        this.sourceOfSupply = dto.sourceOfSupply;
        this.quantity = dto.quantity;
        this.sampleLocation = dto.sampleLocation;
        this.samplePoint = dto.samplePoint;
        this.coordinatesX = dto.coordinatesX;
        this.coordinatesY = dto.coordinatesY;
        this.samplingTechnique = dto.samplingTechnique;
        this.samplingTechniqueM = dto.samplingTechniqueM;
        this.statusPh = dto.statusPh;
        this.statusClr = dto.statusClr;
        this.ciResA = dto.ciResA;
        this.ciResB = dto.ciResB;
        this.condAmbT = dto.condAmbT;
        this.condAmbB = dto.condAmbB;
        this.samplingDay = dto.samplingDay;
        this.samplingTime = dto.samplingTime;
        this.updateUserId = userId;
        this.updateAt = new Date();
    }

    softDelete(userId: number) {
        this.deleteUserId = userId;
        this.deleteAt = new Date();
    }

    toResponse() {
        return {
            id: this.id,
            sampleCode: this.sampleCode,
            description: this.description,
            sourceOfSupply: this.sourceOfSupply,
            quantity: this.quantity,
            sampleLocation: this.sampleLocation,
            samplePoint: this.samplePoint,
            coordinatesX: this.coordinatesX,
            coordinatesY: this.coordinatesY,
            samplingTechnique: this.samplingTechnique,
            samplingTechniqueM: this.samplingTechniqueM,
            statusPh: this.statusPh,
            ciResA: this.ciResA,
            statusClr: this.statusClr,
            ciResB: this.ciResB,
            condAmbT: this.condAmbT,
            condAmbB: this.condAmbB,
            samplingDay: this.samplingDay ? formatDateWithoutTime(this.samplingDay.toString()) : null,
            samplingTime: this.samplingTime ? formatTime(this.samplingTime) : null,
            createAt: this.createAt ? formatDate(this.createAt.toString()) : null,
            updateAt: this.updateAt ? formatDate(this.updateAt.toString()) : null,
            samplingConditions: this.samplingConditions ?? null,
            samplingAceptation: this.samplingAceptation ?? null,
        };
    }
}
