export interface ConfigurationUtil {
    id?: number;
    uuid?: string;
    name?: string;
    basicCosteHour?: number;  
    createUserId?: number;
    createAt?: string;
    updateUserId?: number | null;
    updateAt?: string | null;
    deleteUserId?: number | null;
    deleteAt?: string | null;
}
