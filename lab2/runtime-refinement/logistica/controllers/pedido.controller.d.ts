import { CreatePedidoDto, PedidoResponseDto, QueryPedidoDto, UpdatePedidoDto } from '../dtos';
import { PedidoService } from '../services';
export declare class PedidoController {
    private readonly pedidoService;
    constructor(pedidoService: PedidoService);
    create(dto: CreatePedidoDto): Promise<PedidoResponseDto>;
    findAll(query: QueryPedidoDto): Promise<PedidoResponseDto[]>;
    findById(id: string): Promise<PedidoResponseDto>;
    update(id: string, dto: UpdatePedidoDto): Promise<PedidoResponseDto>;
    delete(id: string): Promise<void>;
}
