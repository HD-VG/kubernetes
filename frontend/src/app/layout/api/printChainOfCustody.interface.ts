import { AnswerQuery } from './answerQuery.interface';
export interface Data {
    message: string;
    status: boolean;
    data: DataClass;
}

export interface DataClass {
    id?: number;
    code_custody?: string;
    laboratoryMB?: boolean;
    laboratoryFQ?: boolean;
    code_thermohygrometer?: string;
    code_thermometer_m_m?: string;
    code_thermometer?: string;
    code_colorimeter?: string;
    initial_conservative?: string;
    create_user_id?: number;
    update_user_id?: null;
    delete_user_id?: null;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: null;
    samplings?: Sampling[];
    transport?: Transport;
}

export interface Sampling {
    id?: number;
    sample_code?: string;
    description?: string;
    source_of_supply?: string;
    quantity?: number;
    sample_location?: string;
    sample_point?: string;
    coordinatesX?: string;
    coordinatesY?: string;
    sampling_technique?: string;
    sampling_technique_m?: string;
    ci_res_a?: string;
    ci_res_b?: string;
    cond_amb_t?: string;
    cond_amb_h?: string;
    sampling_day?: Date;
    sampling_time?: Date;
    create_user_id?: number;
    update_user_id?: number | null;
    delete_user_id?: null;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: null;
}

export interface Transport {
    id?: number;
    responsable?: string;
    user_id?: number;
    distance_traveled?: string;
    conservative_arrival_stretch?: string;
    maximum_stretch?: string;
    init_date?: Date;
    end_date?: Date;
    init_time?: Date;
    end_time?: Date;
    create_user_id?: number;
    update_user_id?: null;
    delete_user_id?: null;
    createAt?: Date;
    updateAt?: Date;
    deleteAt?: null;
}
export interface CustodyPrintReportQuery extends AnswerQuery<DataClass[]> { }
