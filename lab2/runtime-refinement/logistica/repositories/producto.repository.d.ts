import { Repository } from 'typeorm';
import { QueryProductoDto } from '../dtos';
import { Producto } from './entities';
export declare class ProductoRepository {
    private repository;
    constructor(repository: Repository<Producto>);
    create(producto: Partial<Producto>): Promise<Producto>;
    findAll(query: QueryProductoDto): Promise<Producto[]>;
    findById(id: string): Promise<Producto | null>;
    update(id: string, updates: Partial<Producto>): Promise<Producto | null>;
    delete(id: string): Promise<boolean>;
    findProductosDisponiblesParaTendero(tiendaId: string, zona: string): Promise<Producto[]>;
}
