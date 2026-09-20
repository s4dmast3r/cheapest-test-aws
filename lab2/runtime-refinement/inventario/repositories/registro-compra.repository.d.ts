import { Repository } from 'typeorm';
import { QueryRegistroCompraDto } from '../dtos/registro-compra/query-registro-compra.dto';
import { RegistroCompraProductoTienda } from './entities/registro-compra-producto-tienda.entity';
export declare class RegistroCompraRepository {
    private repository;
    constructor(repository: Repository<RegistroCompraProductoTienda>);
    create(registro: Partial<RegistroCompraProductoTienda>): Promise<RegistroCompraProductoTienda>;
    findAll(query: QueryRegistroCompraDto): Promise<RegistroCompraProductoTienda[]>;
    findById(id: string): Promise<RegistroCompraProductoTienda | null>;
    update(id: string, updates: Partial<RegistroCompraProductoTienda>): Promise<RegistroCompraProductoTienda | null>;
    delete(id: string): Promise<boolean>;
}
