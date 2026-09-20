import { CreateProductoDto, ProductoResponseDto, QueryProductoDto, UpdateProductoDto } from '../dtos';
import { ProductoService } from '../services';
export declare class ProductoController {
    private readonly productoService;
    constructor(productoService: ProductoService);
    create(dto: CreateProductoDto): Promise<ProductoResponseDto>;
    findAll(query: QueryProductoDto): Promise<ProductoResponseDto[]>;
    findById(id: string): Promise<ProductoResponseDto>;
    update(id: string, dto: UpdateProductoDto): Promise<ProductoResponseDto>;
    delete(id: string): Promise<void>;
}
