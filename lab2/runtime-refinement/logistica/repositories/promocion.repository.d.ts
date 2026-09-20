import { Repository } from 'typeorm';
import { QueryPromocionDto } from '../dtos';
import { Promocion } from './entities';
export declare class PromocionRepository {
    private repository;
    constructor(repository: Repository<Promocion>);
    create(promocion: Partial<Promocion>): Promise<Promocion>;
    findAll(query: QueryPromocionDto): Promise<Promocion[]>;
    findById(id: string): Promise<Promocion | null>;
    update(id: string, updates: Partial<Promocion>): Promise<Promocion | null>;
    delete(id: string): Promise<boolean>;
    private normalizeTiendaIds;
}
