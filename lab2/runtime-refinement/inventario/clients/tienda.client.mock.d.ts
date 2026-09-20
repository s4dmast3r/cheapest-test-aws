export interface Tienda {
    id: string;
    nombre: string;
    direccion: string;
}
export declare class TiendaClientMock {
    private tiendas;
    findById(id: string): Promise<Tienda | null>;
    exists(id: string): Promise<boolean>;
}
