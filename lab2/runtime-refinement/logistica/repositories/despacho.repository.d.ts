import { Repository } from 'typeorm';
import { QueryDespachoDto } from '../dtos';
import { Despacho } from './entities';
export declare class DespachoRepository {
    private repository;
    constructor(repository: Repository<Despacho>);
    create(despacho: Partial<Despacho>): Promise<Despacho>;
    findAll(query: QueryDespachoDto): Promise<Despacho[]>;
    findById(id: string): Promise<Despacho | null>;
    update(id: string, updates: Partial<Despacho>): Promise<Despacho | null>;
    delete(id: string): Promise<boolean>;
}
