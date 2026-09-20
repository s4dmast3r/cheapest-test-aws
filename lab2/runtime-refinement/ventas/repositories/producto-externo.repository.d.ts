import { Repository } from 'typeorm';
import { ProductoExterno } from './entities/producto-externo.entity';
export interface QueryProductoExternoDto {
    tiendaId?: string;
    codigoBarras?: string;
    categoria?: string;
    nombre?: string;
}
export declare class ProductoExternoRepository {
    private repository;
    constructor(repository: Repository<ProductoExterno>);
    create(data: Partial<ProductoExterno>): Promise<ProductoExterno>;
    findAll(query: QueryProductoExternoDto): Promise<ProductoExterno[]>;
    findById(id: string): Promise<ProductoExterno | null>;
    update(id: string, updates: Partial<ProductoExterno>): Promise<ProductoExterno | null>;
    delete(id: string): Promise<boolean>;
}
