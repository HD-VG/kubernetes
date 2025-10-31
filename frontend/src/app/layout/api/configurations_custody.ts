import { AnswerQuery } from './answerQuery.interface';

export interface ConfigurationsCustody {
    id?: number;
    code_configuration?: string;
    version_configuration?: string;
    message_configuration?: string;
    status_configuration?: boolean;
    created_at?: Date;
}

export interface ConfigurationsCustodyQuery extends AnswerQuery<ConfigurationsCustody[]> { }
