import { TiendaClientMock } from '../clients';
import { CreatePedidoDto, PedidoResponseDto, QueryPedidoDto, UpdatePedidoDto } from '../dtos';
import { PedidoRepository, ProductoRepository } from '../repositories';
export declare class PedidoService {
    private readonly pedidoRepository;
    private readonly productoRepository;
    private readonly tiendaClient;
    constructor(pedidoRepository: PedidoRepository, productoRepository: ProductoRepository, tiendaClient: TiendaClientMock);
    create(dto: CreatePedidoDto): Promise<PedidoResponseDto>;
    findAll(query: QueryPedidoDto): Promise<PedidoResponseDto[]>;
    findById(id: string): Promise<PedidoResponseDto>;
    update(id: string, dto: UpdatePedidoDto): Promise<PedidoResponseDto>;
    delete(id: string): Promise<void>;
    private mapToResponse;
    private mapItemToResponse;
}
