import { CreatePromocionDto, PromocionResponseDto, QueryPromocionDto, UpdatePromocionDto } from '../dtos';
import { PromocionService } from '../services';
export declare class PromocionController {
    private readonly promocionService;
    constructor(promocionService: PromocionService);
    create(dto: CreatePromocionDto): Promise<PromocionResponseDto>;
    findAll(query: QueryPromocionDto): Promise<PromocionResponseDto[]>;
    findById(id: string): Promise<PromocionResponseDto>;
    update(id: string, dto: UpdatePromocionDto): Promise<PromocionResponseDto>;
    delete(id: string): Promise<void>;
}
