import { Repository } from 'typeorm';
import { Catalogo, Producto } from './entities';
export declare class CatalogoProductoRepository {
    private catalogoRepository;
    constructor(catalogoRepository: Repository<Catalogo>);
    addProductoToCatalogo(catalogoId: string, productoId: string): Promise<void>;
    findByCatalogoId(catalogoId: string): Promise<Producto[]>;
    removeProductoFromCatalogo(catalogoId: string, productoId: string): Promise<void>;
    exists(catalogoId: string, productoId: string): Promise<boolean>;
}
