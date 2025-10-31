export interface ConfigurationCar {
    id?: number;
    uuid?: string;
    idVehiculo: string,
    licensePlate: string,
    make: string,
    model: string,
    basicCoste: number,
    estado: number,
    time: string,
    register?: any, //cambiar cuando tengo el register
    createUserId?: number;
    createAt?: string;
    updateUserId?: number | null;
    updateAt?: string | null;
    deleteUserId?: number | null;
    deleteAt?: string | null;
}
export interface CreateUpdateCar{
    register_id: number,
    car: number,
    time: string
}
export interface CarByApi{
    idVehiculo: number;
    placa: string;
    marca: string;
    modelo: string;
    costo_base: number;
    estado: number;
}