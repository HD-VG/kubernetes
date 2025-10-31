import { AnswerQuery } from './answerQuery.interface';
export class Transport {
    id?: number;
    responsable?: string;
    distance_traveled?: string;
    conservative_arrival_stretch?: string;
    maximum_stretch?: string;
    init_date?: Date | string;
    end_date?: Date | string;
    init_time?: string;
    end_time?: string;
    chainOfCustody?: number
  }

  export interface TransportQuery extends AnswerQuery<Transport[]> { }
