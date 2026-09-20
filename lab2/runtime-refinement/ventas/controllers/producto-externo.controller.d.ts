import { CreateProductoExternoDto, ProductoExternoResponseDto, QueryProductoExternoDto, UpdateProductoExternoDto } from '../dtos';
import { ProductoExternoService } from '../services';
export declare class ProductoExternoController {
    private readonly productoExternoService;
    constructor(productoExternoService: ProductoExternoService);
    create(dto: CreateProductoExternoDto): Promise<ProductoExternoResponseDto>;
    findAll(query: QueryProductoExternoDto): Promise<ProductoExternoResponseDto[]>;
    findById(id: string): Promise<ProductoExternoResponseDto>;
    update(id: string, dto: UpdateProductoExternoDto): Promise<ProductoExternoResponseDto>;
    delete(id: string): Promise<void>;
}
