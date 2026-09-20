import { ProductoResponseDto, QueryProductosDisponiblesDto } from '../dtos';
import { ProductoRepository } from '../repositories';
export declare class TenderoService {
    private readonly productoRepository;
    constructor(productoRepository: ProductoRepository);
    getProductosDisponibles(dto: QueryProductosDisponiblesDto): Promise<ProductoResponseDto[]>;
    private mapToResponse;
}
