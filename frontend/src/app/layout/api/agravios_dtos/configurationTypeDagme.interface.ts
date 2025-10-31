export interface ConfigurationTypeDagme {
    id?: number;
    uuid?: string;
    name: string;
    status?: boolean; 
    createUserId?: number;
    createAt?: string;
    updateUserId?: number | null;
    updateAt?: string | null;
    deleteUserId?: number | null;
    deleteAt?: string | null;
}