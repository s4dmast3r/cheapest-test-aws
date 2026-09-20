import { Repository } from 'typeorm';
import { QueryNotaCreditoDto } from '../dtos';
import { NotaCredito } from './entities';
export declare class NotaCreditoRepository {
    private repository;
    constructor(repository: Repository<NotaCredito>);
    create(notaCredito: Partial<NotaCredito>): Promise<NotaCredito>;
    findAll(query: QueryNotaCreditoDto): Promise<NotaCredito[]>;
    findById(id: string): Promise<NotaCredito | null>;
    update(id: string, updates: Partial<NotaCredito>): Promise<NotaCredito | null>;
    delete(id: string): Promise<boolean>;
}
