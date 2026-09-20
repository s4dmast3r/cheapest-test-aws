export declare class TiendaClientMock {
    exists(_tiendaId: string): Promise<boolean>;
    findById(tiendaId: string): Promise<any>;
    findByIds(tiendaIds: string[]): Promise<any[]>;
}
