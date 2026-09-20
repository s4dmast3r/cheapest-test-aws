import { CatalogoProductoRepository, CatalogoRepository, ProductoRepository } from '../repositories';
export declare class CatalogoProductoService {
    private readonly catalogoProductoRepository;
    private readonly catalogoRepository;
    private readonly productoRepository;
    constructor(catalogoProductoRepository: CatalogoProductoRepository, catalogoRepository: CatalogoRepository, productoRepository: ProductoRepository);
    addProductoToCatalogo(catalogoId: string, productoId: string): Promise<void>;
    removeProductoFromCatalogo(catalogoId: string, productoId: string): Promise<void>;
    getProductosByCatalogo(catalogoId: string): Promise<any[]>;
}
