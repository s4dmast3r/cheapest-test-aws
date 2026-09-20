import { Repository } from 'typeorm';
import { QueryRegistroVentaDto } from '../dtos/registro-venta/query-registro-venta.dto';
import { RegistroVentaProductoTienda } from './entities/registro-venta-producto-tienda.entity';
export declare class RegistroVentaRepository {
    private repository;
    constructor(repository: Repository<RegistroVentaProductoTienda>);
    create(registro: Partial<RegistroVentaProductoTienda>): Promise<RegistroVentaProductoTienda>;
    findAll(query: QueryRegistroVentaDto): Promise<RegistroVentaProductoTienda[]>;
    findById(id: string): Promise<RegistroVentaProductoTienda | null>;
    update(id: string, updates: Partial<RegistroVentaProductoTienda>): Promise<RegistroVentaProductoTienda | null>;
    delete(id: string): Promise<boolean>;
}
