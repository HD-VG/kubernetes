/* eslint-disable prettier/prettier */
//esto es para listar los materiales de la url
export class StoreMaterials {
    data: Materials;
}
export class Materials {
    codigo?: string;
    padre?: string;
    nivel?: number;
    ramas?: number;
    nombre?: string;
    unidad?: string;
    valMinimo?: number;
    valMaximo?: number;
    precioUs?: number;
    PrecioBs?: number;
    tipoItem?: string;
    iAlmacen?: string;
    cantidadD?: number;
    cantidadH?: number;
    saldoCantidad?: number;
    debeBs?: number;
    HaberBs?: number;
    SaldoCosto?: number
}
