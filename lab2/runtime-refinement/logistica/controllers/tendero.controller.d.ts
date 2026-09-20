import { ProductoResponseDto, QueryProductosDisponiblesDto } from '../dtos';
import { TenderoService } from '../services';
export declare class TenderoController {
    private readonly tenderoService;
    constructor(tenderoService: TenderoService);
    getProductosDisponibles(query: QueryProductosDisponiblesDto): Promise<ProductoResponseDto[]>;
}
