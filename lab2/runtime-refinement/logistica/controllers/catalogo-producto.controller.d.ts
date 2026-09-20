import { AddProductoToCatalogoDto } from '../dtos';
import { CatalogoProductoService } from '../services';
export declare class CatalogoProductoController {
    private readonly catalogoProductoService;
    constructor(catalogoProductoService: CatalogoProductoService);
    addProductoToCatalogo(catalogoId: string, dto: AddProductoToCatalogoDto): Promise<{
        message: string;
    }>;
    getProductosByCatalogo(catalogoId: string): Promise<any[]>;
    removeProductoFromCatalogo(catalogoId: string, productoId: string): Promise<{
        message: string;
    }>;
}
