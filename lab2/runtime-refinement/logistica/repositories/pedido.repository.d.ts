import { Repository } from 'typeorm';
import { QueryPedidoDto } from '../dtos';
import { Pedido } from './entities';
export declare class PedidoRepository {
    private repository;
    constructor(repository: Repository<Pedido>);
    create(pedido: Partial<Pedido>): Promise<Pedido>;
    findAll(query: QueryPedidoDto): Promise<Pedido[]>;
    findById(id: string): Promise<Pedido | null>;
    update(id: string, updates: Partial<Pedido>): Promise<Pedido | null>;
    delete(id: string): Promise<boolean>;
}
