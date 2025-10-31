import { AnswerQuery } from './answerQuery.interface';

export interface UserRol {
    id_user_rol?: number;
    id_rol?: number;
    name?: string
}
export interface User {
    id?:        number;
    name?:      string;
    username?:  string;
    email?:     string;
    password?:  string;
    createAt?:  string;
    rol?:       UserRol[];
}

export interface UserQuery extends AnswerQuery<User[]> { }
