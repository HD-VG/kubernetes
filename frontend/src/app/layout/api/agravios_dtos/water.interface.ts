export interface Water {
    id?: number;
    uuid?: string;
    name?: string;
    basicCoste?: number;
    height?: number;
    cohefficientDischarge?: number;
    createUserId?: number;
    createAt?: string;
    updateUserId?: number | null;
    updateAt?: string | null;
    deleteUserId?: number | null;
    deleteAt?: string | null;
}
