import { AnswerQuery } from './answerQuery.interface';
export class ChainOfCustody {
    id?: number;
    code_custody?: string
    laboratoryMB?: boolean;
    laboratoryFQ?: boolean;
    code_thermohygrometer?: string;
    code_thermometer_m_m?: string;
    code_thermometer?: string;
    code_colorimeter?: string;
    initial_conservative?: string;
    created_at?: Date;
  }

  export interface CustodyQuery extends AnswerQuery<ChainOfCustody[]> { }
