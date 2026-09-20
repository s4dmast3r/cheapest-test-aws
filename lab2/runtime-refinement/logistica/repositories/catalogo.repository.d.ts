import { Repository } from 'typeorm';
import { QueryCatalogoDto } from '../dtos';
import { Catalogo } from './entities';
export declare class CatalogoRepository {
    private repository;
    constructor(repository: Repository<Catalogo>);
    create(catalogo: Partial<Catalogo>): Promise<Catalogo>;
    findAll(query: QueryCatalogoDto): Promise<Catalogo[]>;
    findById(id: string): Promise<Catalogo | null>;
    update(id: string, updates: Partial<Catalogo>): Promise<Catalogo | null>;
    delete(id: string): Promise<boolean>;
}
