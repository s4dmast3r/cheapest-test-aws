import { Repository } from 'typeorm';
import { QueryItemInventarioDto } from '../dtos/item-inventario/query-item-inventario.dto';
import { ItemInventario } from './entities';
export declare class ItemInventarioRepository {
    private repository;
    constructor(repository: Repository<ItemInventario>);
    create(item: Partial<ItemInventario>): Promise<ItemInventario>;
    findAll(query: QueryItemInventarioDto): Promise<ItemInventario[]>;
    findById(id: string): Promise<ItemInventario | null>;
    findByProductoAndTienda(productoId: string, tiendaId: string): Promise<ItemInventario | null>;
    update(id: string, updates: Partial<ItemInventario>): Promise<ItemInventario | null>;
    delete(id: string): Promise<boolean>;
    decrementCantidad(id: string, cantidad: number): Promise<void>;
    incrementCantidad(id: string, cantidad: number): Promise<void>;
}
