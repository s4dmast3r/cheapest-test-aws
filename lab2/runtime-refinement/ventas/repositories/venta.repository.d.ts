import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
export interface QueryVentaDto {
    tiendaId?: string;
    fechaDesde?: Date;
    fechaHasta?: Date;
    productoExternoId?: string;
    productoId?: string;
}
export declare class VentaRepository {
    private repository;
    constructor(repository: Repository<Venta>);
    create(data: Partial<Venta>): Promise<Venta>;
    findAll(query: QueryVentaDto): Promise<Venta[]>;
    findById(id: string): Promise<Venta | null>;
    update(id: string, updates: Partial<Venta>): Promise<Venta | null>;
    delete(id: string): Promise<boolean>;
}
