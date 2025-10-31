export interface ConfigurationTypeMachine {
    id?: number;
    uuid?: string;
    name?: string;
    basicCoste?: number;
    basicCosteHour?: number; 
    basicCosteYear?: number;  
    createUserId?: number;
    createAt?: string;
    updateUserId?: number | null;
    updateAt?: string | null;
    deleteUserId?: number | null;
    deleteAt?: string | null;
}
