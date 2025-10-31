import { AnswerQuery } from './answerQuery.interface';
export class Sampling {
    id?: number;
    sample_code?: string
    description?: string;
    source_of_supply?: string;
    quantity?: number;
    sample_location?: string;
    sample_location_t?: string;
    sample_point?: string;
    coordinatesX?: string;
    coordinatesY?: string;
    sampling_technique?: string;
    sampling_technique_m?: string;
    ci_res_a?: number;
    ci_res_b?: number;
    cond_amb_t?: number;
    cond_amb_h?: number;
    sampling_day?: Date | string;
    sampling_time?: Date | string;
    created_at?: Date;
    sampling_conditions?: any | JSON;
    sampling_aceptation?: string;
    chainOfCustody?: number;
  }

  export interface SamplingQuery extends AnswerQuery<Sampling[]> { }
