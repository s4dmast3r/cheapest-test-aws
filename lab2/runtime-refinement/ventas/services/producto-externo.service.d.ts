import { TiendaClientMock } from '../clients';
import { CreateProductoExternoDto, ProductoExternoResponseDto, QueryProductoExternoDto, UpdateProductoExternoDto } from '../dtos';
import { ProductoExternoRepository } from '../repositories/producto-externo.repository';
export declare class ProductoExternoService {
    private readonly productoExternoRepository;
    private readonly tiendaClient;
    constructor(productoExternoRepository: ProductoExternoRepository, tiendaClient: TiendaClientMock);
    create(dto: CreateProductoExternoDto): Promise<ProductoExternoResponseDto>;
    findAll(query: QueryProductoExternoDto): Promise<ProductoExternoResponseDto[]>;
    findById(id: string): Promise<ProductoExternoResponseDto>;
    update(id: string, dto: UpdateProductoExternoDto): Promise<ProductoExternoResponseDto>;
    delete(id: string): Promise<void>;
    exists(id: string): Promise<boolean>;
    private mapToResponse;
}
