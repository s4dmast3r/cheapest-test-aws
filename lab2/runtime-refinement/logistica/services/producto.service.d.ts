import { CreateProductoDto, ProductoResponseDto, QueryProductoDto, UpdateProductoDto } from '../dtos';
import { ProductoRepository } from '../repositories';
export declare class ProductoService {
    private readonly productoRepository;
    constructor(productoRepository: ProductoRepository);
    create(dto: CreateProductoDto): Promise<ProductoResponseDto>;
    findAll(query: QueryProductoDto): Promise<ProductoResponseDto[]>;
    findById(id: string): Promise<ProductoResponseDto>;
    update(id: string, dto: UpdateProductoDto): Promise<ProductoResponseDto>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    private mapToResponse;
}
