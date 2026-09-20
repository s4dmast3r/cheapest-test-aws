import { CreatePromocionDto, PromocionResponseDto, QueryPromocionDto, UpdatePromocionDto } from '../dtos';
import { PromocionRepository } from '../repositories';
export declare class PromocionService {
    private readonly promocionRepository;
    constructor(promocionRepository: PromocionRepository);
    create(dto: CreatePromocionDto): Promise<PromocionResponseDto>;
    findAll(query: QueryPromocionDto): Promise<PromocionResponseDto[]>;
    findById(id: string): Promise<PromocionResponseDto>;
    update(id: string, dto: UpdatePromocionDto): Promise<PromocionResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
}
