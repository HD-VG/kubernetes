import { AnswerQuery } from './answerQuery.interface';
export class Applicant {
    id?: number;
    entity_name?: string;
    location?: string;
    reference_person?: string;
    phone?: string;
    created_at?: Date;
    chainOfCustody?: number
  }

  export interface ApplicantQuery extends AnswerQuery<Applicant[]> { }
